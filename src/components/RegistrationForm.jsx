import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data); 
      } else {
        
      }
    } catch (error) {
      console.error("Registration failed:", error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;