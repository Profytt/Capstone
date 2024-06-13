import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "./Auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    
    const fakeUserData = {
      id: 1,
      username: username,
      password: password
      
    };

    login(fakeUserData);
  };

  return (
    <div>
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
        
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      
      {user && ( 
        <Link to="/" className="btn btn-primary mt-2">
          Go to Home
        </Link>
      )}
    </div>
  );
}

export default LoginForm;
