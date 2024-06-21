import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "./Auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    const fakeUserData = {
      id: 1, // Some fake user ID
      username: username,
      // ... other user details you want to store
    };

    login(fakeUserData); // Simulate successful login
    navigate("/"); // Redirect to home after successful login
  };

  return (
    <div className="container mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
