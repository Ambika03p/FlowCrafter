// toolbar.js

import React from 'react';
import { useStore } from './store';
import { colors, spacing, borderRadius, shadows, transitions } from './theme';

const styles = {
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.xl}`,
    borderBottom: `1px solid ${colors.gray[200]}`,
    backgroundColor: colors.gray[50],
  },
  buttonGroup: {
    display: 'flex',
    gap: spacing.xs,
  },
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: colors.gray[200],
    margin: `0 ${spacing.md}`,
  },
  button: {
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: '13px',
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.gray[200]}`,
    backgroundColor: '#ffffff',
    color: colors.gray[600],
    cursor: 'pointer',
    transition: transitions.fast,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    '&:hover': {
      backgroundColor: colors.gray[50],
      borderColor: colors.gray[300],
    },
    '&:active': {
      backgroundColor: colors.gray[100],
    },
  },
  iconButton: {
    width: '32px',
    height: '32px',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '16px',
  }
};

export const PipelineToolbar = () => {
  const { nodes, edges, setNodes, setEdges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    setNodes: state.setNodes,
    setEdges: state.setEdges
  }));

  const handleClear = () => {
    if (nodes.length === 0 && edges.length === 0) return;
    
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      setNodes([]);
      setEdges([]);
    }
  };

  return (
    <div style={styles.toolbar}>
      <div style={styles.buttonGroup}>
        <button 
          style={{ ...styles.button, ...styles.iconButton }}
          title="Undo"
          onClick={() => {/* Implement undo */}}
        >
          <span style={styles.icon}>↩</span>
        </button>
        <button 
          style={{ ...styles.button, ...styles.iconButton }}
          title="Redo"
          onClick={() => {/* Implement redo */}}
        >
          <span style={styles.icon}>↪</span>
        </button>
      </div>

      <div style={styles.divider} />

      <div style={styles.buttonGroup}>
        <button 
          style={styles.button}
          onClick={() => {/* Implement zoom to fit */}}
        >
          <span style={styles.icon}>🔍</span>
          Fit View
        </button>
        <button 
          style={styles.button}
          onClick={handleClear}
        >
          <span style={styles.icon}>🗑</span>
          Clear
        </button>
      </div>
    </div>
  );
};
