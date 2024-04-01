import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import VerifyPage from './Pages/VerifyPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <>
    <Router>
        <Routes>
        <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/forgot-password" element={<ForgotPasswordPage/>} />
          <Route exact path="/api/v1/auth/reset-password/:token" element={<ResetPasswordPage />} />
          <Route exact path="/api/v1/auth/verifyRegistration" element={<VerifyPage/>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App