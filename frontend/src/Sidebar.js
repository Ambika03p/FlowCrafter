// sideBar.js
import React from 'react';
import { DraggableNode } from './draggableNode';

const nodeCategories = [
  {
    title: 'Basic',
    nodes: [
      { 
        type: 'text', 
        label: 'Text',
        iconColor: '#4F46E5', // Indigo
        badge: null
      },
      { 
        type: 'input', 
        label: 'Input',
        iconColor: '#059669', // Green
        badge: 'Source'
      },
      { 
        type: 'output', 
        label: 'Output',
        iconColor: '#DC2626', // Red
        badge: 'Sink'
      }
    ]
  },
  {
    title: 'AI & Data',
    nodes: [
      { 
        type: 'llm', 
        label: 'LLM',
        iconColor: '#7C3AED', // Purple
        badge: 'AI'
      },
      { 
        type: 'transform', 
        label: 'Transform',
        iconColor: '#D97706', // Amber
        badge: 'Data'
      }
    ]
  },
  {
    title: 'Integration',
    nodes: [
      { 
        type: 'api', 
        label: 'API',
        iconColor: '#0891B2', // Cyan
        badge: 'HTTP'
      },
      { 
        type: 'database', 
        label: 'Database',
        iconColor: '#0D9488', // Teal
        badge: 'Storage'
      }
    ]
  }
];

export const Sidebar = () => {
  return (
    <aside className="w-[350px] h-screen bg-[#1a1a1a] border-r border-gray-800 shadow-lg flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-800 bg-[#1a1a1a]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
            <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-white">FlowCrafte</h1>
        </div>
        <p className="text-sm font-medium text-gray-400">Node Library</p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {nodeCategories.map((category, idx) => (
          <div key={idx} className="group">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 px-2 flex items-center">
              {category.title}
              <div className="flex-1 ml-3 h-px bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </h3>
            <div className="space-y-1.5">
              {category.nodes.map((node, nodeIdx) => (
                <DraggableNode key={nodeIdx} {...node} darkMode={true} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
