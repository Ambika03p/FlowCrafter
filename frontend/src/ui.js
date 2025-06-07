// ui.js

import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, { Background, useReactFlow, addEdge, getConnectedEdges } from 'reactflow';
import { useStore } from './store';
import { nodeTypes } from './nodes/nodeTypes';
import 'reactflow/dist/style.css';

export const PipelineUI = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reactFlowWrapper = useRef(null);
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    setNodes, 
    setEdges 
  } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    setNodes: state.setNodes,
    setEdges: state.setEdges
  }));

  const { project, zoomIn, zoomOut, fitView } = useReactFlow();

  const onZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const onZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const onFitView = useCallback(() => {
    fitView({ padding: 0.1 });
  }, [fitView]);

  const onClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds ? [...nds, newNode] : [newNode]);
    },
    [project, setNodes]
  );

  // Helper function to detect cycles in the graph (check if it's a DAG)
  const isDAG = useCallback((nodes, edges) => {
    if (!nodes || !edges) return true;

    const visited = new Set();
    const recursionStack = new Set();

    const hasCycle = (nodeId) => {
      visited.add(nodeId);
      recursionStack.add(nodeId);

      const outgoingEdges = edges.filter(edge => edge.source === nodeId);
      for (const edge of outgoingEdges) {
        if (!visited.has(edge.target)) {
          if (hasCycle(edge.target)) {
            return true;
          }
        } else if (recursionStack.has(edge.target)) {
          return true;
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (node && node.id && !visited.has(node.id)) {
        if (hasCycle(node.id)) {
          return false; // Found a cycle, not a DAG
        }
      }
    }

    return true; // No cycles found, it's a DAG
  }, []);

  const onSubmit = useCallback(() => {
    if (!nodes || !edges) return;

    setIsSubmitting(true);
    
    try {
      const isDag = isDAG(nodes, edges);
      
      const message = `Pipeline Summary:
- Number of Nodes: ${nodes.length}
- Number of Edges: ${edges.length}
- Is DAG: ${isDag ? 'Yes ✓' : 'No ✗'}`;

      alert(message);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Error submitting pipeline. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [nodes, edges, isDAG]);

  return (
    <div className="relative flex-1 overflow-hidden bg-dark" ref={reactFlowWrapper}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid" style={{ opacity: '0.4' }} />
      <div className="absolute inset-0 bg-grid-pattern-dark bg-grid-lg" style={{ opacity: '0.4' }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-dark via-dark/90 to-dark/95 z-0" />

      {/* Top Toolbar */}
      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button 
          onClick={onFitView}
          className="px-3 py-2 text-sm bg-dark-node/90 border border-dark-border/40 rounded-md text-gray-200 hover:bg-dark-hover hover:border-dark-border-hover/50 transition-all duration-200"
        >
          Fit View
        </button>
        <button 
          onClick={onClear}
          className="px-3 py-2 text-sm bg-dark-node/90 border border-dark-border/40 rounded-md text-gray-200 hover:bg-dark-hover hover:border-dark-border-hover/50 transition-all duration-200"
        >
          Clear
        </button>
      </div>

      {/* Canvas Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        <button 
          onClick={onZoomIn}
          className="w-8 h-8 flex items-center justify-center bg-dark-node/90 border border-dark-border/40 rounded-md text-gray-200 hover:bg-dark-hover hover:border-dark-border-hover/50 transition-all duration-200"
          title="Zoom In"
        >
          +
        </button>
        <button 
          onClick={onZoomOut}
          className="w-8 h-8 flex items-center justify-center bg-dark-node/90 border border-dark-border/40 rounded-md text-gray-200 hover:bg-dark-hover hover:border-dark-border-hover/50 transition-all duration-200"
          title="Zoom Out"
        >
          −
        </button>
        <button 
          onClick={onFitView}
          className="w-8 h-8 flex items-center justify-center bg-dark-node/90 border border-dark-border/40 rounded-md text-gray-200 hover:bg-dark-hover hover:border-dark-border-hover/50 transition-all duration-200"
          title="Fit View"
        >
          ⤢
        </button>
      </div>

      {/* Submit Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <button 
          onClick={onSubmit}
          disabled={isSubmitting || !nodes || nodes.length === 0}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 shadow-lg
            ${isSubmitting || !nodes || nodes.length === 0 
              ? 'bg-primary-400/60 cursor-not-allowed text-white/70'
              : 'bg-primary-500/90 hover:bg-primary-600 text-white hover:shadow-xl'
            }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <ReactFlow
        nodes={nodes || []}
        edges={edges || []}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        className="bg-dark"
      >
        <Background 
          variant="dots"
          gap={25}
          size={1}
          color="rgba(71, 119, 217, 0.2)"
          className="bg-dark"
        />
      </ReactFlow>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-10 h-10 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
