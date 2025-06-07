// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const MAX_HISTORY_LENGTH = 50;

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
  history: [],
  historyIndex: -1,
};

export const useStore = create((set, get) => ({
  ...initialState,

  // Direct state setters
  setNodes: (nodes) => {
    const currentNodes = get().nodes || [];
    const newNodes = typeof nodes === 'function' ? nodes(currentNodes) : nodes;
    
    const { history, historyIndex } = get();
    const currentEdges = get().edges || [];
    const newHistory = [...history.slice(0, historyIndex + 1), { nodes: newNodes, edges: currentEdges }];
    
    if (newHistory.length > MAX_HISTORY_LENGTH) {
      newHistory.shift();
    }

    set({
      nodes: newNodes,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  setEdges: (edges) => {
    const currentEdges = get().edges || [];
    const newEdges = typeof edges === 'function' ? edges(currentEdges) : edges;
    
    const { history, historyIndex } = get();
    const currentNodes = get().nodes || [];
    const newHistory = [...history.slice(0, historyIndex + 1), { nodes: currentNodes, edges: newEdges }];
    
    if (newHistory.length > MAX_HISTORY_LENGTH) {
      newHistory.shift();
    }

    set({
      edges: newEdges,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  // History management
  addToHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const currentNodes = nodes || [];
    const currentEdges = edges || [];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: currentNodes, edges: currentEdges });
    
    if (newHistory.length > MAX_HISTORY_LENGTH) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const { nodes, edges } = history[newIndex];
      set({
        nodes: nodes || [],
        edges: edges || [],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const { nodes, edges } = history[newIndex];
      set({
        nodes: nodes || [],
        edges: edges || [],
        historyIndex: newIndex,
      });
    }
  },

  // Node management
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    const { addToHistory } = get();
    addToHistory();
    const currentNodes = get().nodes || [];
    set({
      nodes: [...currentNodes, {
        ...node,
        data: {
          ...node.data,
          id: node.id,
          type: node.type,
          onChange: (nodeId, fieldName, value) => {
            get().updateNodeField(nodeId, fieldName, value);
          }
        }
      }]
    });
  },

  updateNode: (nodeId, updates) => {
    const { addToHistory } = get();
    addToHistory();
    const currentNodes = get().nodes || [];
    set({
      nodes: currentNodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
    });
  },

  deleteNode: (nodeId) => {
    const { addToHistory } = get();
    addToHistory();
    const currentNodes = get().nodes || [];
    const currentEdges = get().edges || [];
    set({
      nodes: currentNodes.filter((node) => node.id !== nodeId),
      edges: currentEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },

  // Edge management
  onNodesChange: (changes) => {
    const { addToHistory } = get();
    addToHistory();
    const currentNodes = get().nodes || [];
    set({
      nodes: applyNodeChanges(changes, currentNodes),
    });
  },

  onEdgesChange: (changes) => {
    const { addToHistory } = get();
    addToHistory();
    const currentEdges = get().edges || [];
    set({
      edges: applyEdgeChanges(changes, currentEdges),
    });
  },

  onConnect: (connection) => {
    const { addToHistory } = get();
    addToHistory();
    const currentEdges = get().edges || [];
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#93c5fd' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#93c5fd',
          },
        },
        currentEdges
      ),
    });
  },

  // Field updates
  updateNodeField: (nodeId, fieldName, value) => {
    const { addToHistory } = get();
    addToHistory();
    const currentNodes = get().nodes || [];
    set({
      nodes: currentNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: value }
          };
        }
        return node;
      }),
    });
  },
}));
