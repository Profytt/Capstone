import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      login(data);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;