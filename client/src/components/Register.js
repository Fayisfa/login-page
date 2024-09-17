import React, { useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

function Register() {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5200/register", {
        name,
        email,
        password,
        role,
      });

      if (response.data.Status === "User Registered") {
        setSuccess("User registered successfully!");
        setError("");
        navigate("/");
      } else {
        setError(response.data.Error);
        setSuccess("");
        setShowModal(true); // Show modal on error
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed");
      setSuccess("");
      setShowModal(true); // Show modal on error
    }
  };

  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <Fragment>
      <div className="container-fluid p-0">
        {/* Navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand font-weight-bolder" href="#">
              Directorate of Technical Education
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fas fa-sign-out-alt"></i>Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Registration section */}
        <section className="vh-85 mt-4 d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-4 text-black"> {/* Adjusted width */}
                <div
                  className="card shadow-lg p-3"
                  style={{ borderRadius: "15px" }} // Adjusted padding
                >
                  <div className="d-flex align-items-center justify-content-center h-custom-2 px-3">
                    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                      <h3
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Register
                      </h3>
                      <div className="form-outline mb-3"> {/* Adjusted margin */}
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label className="form-label">Name</label>
                      </div>

                      <div className="form-outline mb-3"> {/* Adjusted margin */}
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label">Email</label>
                      </div>

                      <div className="form-outline mb-3"> {/* Adjusted margin */}
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="pt-1 mb-3"> {/* Adjusted margin */}
                        <button
                          className="btn btn-info btn-lg btn-block"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal for error messages */}
        {showModal && (
          <div
            className="modal fade show"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-sm" role="document"> {/* Adjusted size */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Error</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{error}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Register;
