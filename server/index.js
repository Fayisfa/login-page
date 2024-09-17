const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const saltRounds = 10;
const jwtSecret = "jwt-secret-key";

// Middleware
app.use(cors({
    origin: "http://localhost:3001", // Ensure this matches your frontend port
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)';
        await pool.query(sql, [name, email, hashedPassword, role]);
        res.json({ Status: "User Registered" });
    } catch (error) {
        console.error(error);
        res.json({ Error: "Error registering user" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(sql, [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Compare the password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ name: user.name, role: user.role }, jwtSecret, { expiresIn: '1d' });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false, // Set true if using HTTPS in production
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });

                res.json({ Status: "Success", Role: user.role });
            } else {
                res.json({ Error: "Password does not match" });
            }
        } else {
            res.json({ Error: "No user found with this email" });
        }
    } catch (error) {
        console.error(error);
        res.json({ Error: "Login error" });
    }
});

// Check Authentication Route
app.get('/check-auth', (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ Status: "Not Authenticated" });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ Status: "Invalid Token" });

        res.json({ Status: "Authenticated", Role: decoded.role });
    });
});

// Start server on port 5200
app.listen(5200, () => {
    console.log("Server has started on port 5200");
});
