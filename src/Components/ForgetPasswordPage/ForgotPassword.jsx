import { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({
        email: "",
    });
    const { email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8080/api/v1/auth/forgot-password",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setShowModal(true);
            setStatus(true);
            setSuccessMessage("Password Reset Link Sent!");

            setModalMessage(`Check your email ${email} for the reset link`);

        } catch (error) {
            console.error("Error during password reset:", error);

            setStatus(false);
            setErrorMessage("Password Reset Failed!");

            setShowModal(true);
            setModalMessage(
                error.response?.data?.message ||
                "Kindly check that you have inputted the correct email. If the issue persists, please try again later."
            );
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSuccessMessage("");
        setErrorMessage("");
        setModalMessage("");
    };

    return (
        <div className="forget-password-container">
            <img src="../src/assets/Rectangle 58.svg" alt="Your Image" className="forget-password-image" />
            <div className="forget-password-content-container">
                <div className="password-reset-items">
                    
                    <div className="forgot-password-logo-title">
                    <Link to={"/"}><img className="forgot-password-logo-image" src="../src/assets/airway_logo.svg"/></Link>
                        <div className="create-acct-text">Reset your password</div>
                    </div>
                   
                    <div className="reset-instruction-form">
                        <div className="reset-password-text">
                            Enter your email below and we’ll send you instructions on how to reset your password.
                        </div>
                        <div className="forgot-password-form">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="single-input-field">
                                    <label className="forgot-password-label" htmlFor="email">Email Address</label>
                                    <input
                                        className="forgot-password-input-field"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onInputChange(e)}
                                        placeholder="ChiomaA@gmail.com"
                                        required
                                    />
                                </div>
                                <button type="primary" className="forgot-password-button-ctaa">Send reset instructions</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`forgot-modal ${showModal ? 'show' : ''}`}>
              <div className="forgot-modal-container">
                    <div className="forgot-modal-content">
                      <div className="forgot-modal-title">
                        <Modal.Title>
                          {status ? successMessage : errorMessage}
                        </Modal.Title>
                      </div>
                      <div className="forgot-modal-icon">
                          <img src="../src/assets/SignupSuccessfulIcon.png"alt="modal icon"/>
                      </div>
                        <div className="forgot-modal-body">
                          <Modal.Body>
                            <div className="forgot-modal-body-text">
                            {modalMessage}
                            </div>
                          </Modal.Body>
                        </div>
                        <Modal.Footer>
                            <button className="forgot-modal-button" onClick={handleClose}>
                                Continue
                            </button>
                        </Modal.Footer>
                    </div>
              </div>
          </div>
            </div>
        </div>
    );
};
export default ForgotPassword; 