import React, { useState, useContext } from "react";
import { AuthContext } from "./Auth";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext); // Assuming login is also used for registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //In a real app you would check to see if the user is already registered, 
    //if they are display an error message, if not then you would add the user
    //to the database
    
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        login(data); // Log the user in immediately after registration
      } else {
        // Handle registration error (e.g., display error message)
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error
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