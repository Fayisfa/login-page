const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Fayisfa",
    host: "localhost",
    port: 5432,
    database: "workshop"
});

module.exports = pool;