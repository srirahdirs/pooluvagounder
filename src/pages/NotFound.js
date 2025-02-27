// ./pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go Home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  header: {
    fontSize: '100px',
    color: '#ff6f61',
  },
  message: {
    fontSize: '20px',
    marginBottom: '20px',
  },
  link: {
    fontSize: '18px',
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default NotFound;
