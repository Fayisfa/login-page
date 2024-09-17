import React, { useState, Fragment } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

function Login() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5200/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.Status === "Success") {
        if (response.data.Role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(response.data.Error);
        setShowModal(true); // Show modal when error occurs
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
      setShowModal(true); // Show modal when error occurs
    }
  };

  return (
    <Fragment>
      <div className="container-fluid p-0">
        {/** Navigation bar */}
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

        {/* Login section */}
        <section className="vh-85 mt-5 d-flex justify-content-center align-items-center">
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
                        Log in
                      </h3>

                      <div className="form-outline mb-3"> {/* Adjusted margin */}
                        <input
                          type="email"
                          id="form2Example18"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example18">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-3"> {/* Adjusted margin */}
                        <input
                          type="password"
                          id="form2Example28"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form2Example28">
                          Password
                        </label>
                      </div>

                      <div className="pt-1 mb-3"> {/* Adjusted margin */}
                        <button
                          className="btn btn-info btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="errorModal"
        tabIndex="-1"
        aria-labelledby="errorModalLabel"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
        role="dialog"
      >
        <div className="modal-dialog modal-sm" role="document"> {/* Adjusted size */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="errorModalLabel">
                Error
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{error}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;