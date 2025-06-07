// // submit.js


import React, { useState } from 'react';

const styles = {
  button: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  buttonHover: {
    backgroundColor: '#2563eb',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-1px)'
  },
  buttonActive: {
    backgroundColor: '#1d4ed8',
    transform: 'translateY(1px)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed',
    opacity: 0.7,
    boxShadow: 'none'
  },
  buttonLoading: {
    cursor: 'wait',
    opacity: 0.8
  },
  icon: {
    fontSize: '20px'
  }
};

export const SubmitButton = ({ nodes, edges }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit pipeline');
      }

      const data = await response.json();
      
      // Create user-friendly message
      const message = `Pipeline Analysis:
• Number of Nodes: ${data.num_nodes}
• Number of Edges: ${data.num_edges}
• Is DAG: ${data.is_dag ? 'Yes' : 'No'}`;

      // Show alert with the results
      alert(message);

      return data;
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Failed to submit pipeline. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !nodes.length;

  return (
    <button
      onClick={handleSubmit}
      disabled={isDisabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        ...styles.button,
        ...(isHovered && !isDisabled && !isLoading ? styles.buttonHover : {}),
        ...(isActive && !isDisabled && !isLoading ? styles.buttonActive : {}),
        ...(isDisabled ? styles.buttonDisabled : {}),
        ...(isLoading ? styles.buttonLoading : {}),
      }}
    >
      <span style={styles.icon}>{isLoading ? '⚡' : '▶'}</span>
      {isLoading ? 'Analyzing Pipeline...' : 'Analyze Pipeline'}
    </button>
  );
};
