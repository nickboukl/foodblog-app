import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "3rem",
    color: "#e74c3c"
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "20px"
  },
  link: {
    fontSize: "1rem",
    color: "#3498db",
    textDecoration: "none",
    border: "1px solid #3498db",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "0.3s"
  }
};
