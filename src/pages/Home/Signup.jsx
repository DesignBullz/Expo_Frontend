import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../../assets/j.jpg"; // Adjust the path to your image

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check if all fields are filled
    if (!email || !username || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Make the API call
    try {
      const response = await fetch("https://api.dbzmanager.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If successful, navigate to the login page
        navigate("/");
      } else {
        // If there's an error, set the error message from the backend
        setErrorMessage(
          data.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Ensures the image fully covers the container
        backgroundPosition: "center", // Keeps the image centered
        backgroundRepeat: "no-repeat", // Prevents the background from repeating
        backgroundAttachment: "fixed", // Keeps the background fixed when scrolling
        height: "100vh", // Ensures the container takes up the full viewport height
      }}
    >
      <main className="flex justify-center items-center flex-grow p-8">
        <div
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transform transition-all absolute"
          style={{
            right: "112px", // Adjust this value to control how much space to the left the form should have
            top: "50%",
            transform: "translateY(-50%)", // To vertically center the form
          }}
        >
          <h2 className="text-2xl font-heading font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSignup}>
            {/* Username Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Username
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaUserAlt size={20} className="text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaEnvelope size={20} className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaLock size={20} className="text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Confirm Password
              </label>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <FaLock size={20} className="text-gray-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="ml-2 w-full border-none focus:outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-black text-white px-6 py-2 rounded-md w-full hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-600 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
