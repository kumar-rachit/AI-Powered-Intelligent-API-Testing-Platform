import React from 'react';
import './App.css';

const App = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    },
    content: {
      maxWidth: '800px',
      width: '100%',
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      color: '#1f2937',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.125rem',
      textAlign: 'center' as const,
      color: '#4b5563',
      marginBottom: '2rem',
    },
    card: {
      background: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    cardText: {
      color: '#4b5563',
      marginBottom: '1.5rem',
      lineHeight: '1.6',
    },
    button: {
      display: 'inline-block',
      padding: '0.75rem 1.5rem',
      background: '#2563eb',
      color: 'white',
      borderRadius: '0.5rem',
      textDecoration: 'none',
      transition: 'background 0.2s',
      cursor: 'pointer',
      border: 'none',
      fontSize: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🧪 TestGenAI</h1>
        <p style={styles.subtitle}>AI-Powered API Testing & Validation Platform</p>
        
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome to TestGenAI</h2>
          <p style={styles.cardText}>
            An enterprise-grade API testing platform powered by AI to automatically generate intelligent test cases, 
            execute tests, and validate responses using advanced AI models.
          </p>
          <button style={styles.button} onClick={() => window.location.href = '/login'}>
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
