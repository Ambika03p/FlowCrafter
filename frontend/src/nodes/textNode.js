import React, { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to detect variables in the text
  const detectVariables = (inputText) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...inputText.matchAll(regex)];
    return matches.map(match => match[1].trim());
  };

  // Handle text change and resize
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Update variables
    const newVariables = detectVariables(newText);
    setVariables(newVariables);

    // Update node data if onChange handler exists
    if (data?.onChange) {
      data.onChange(id, 'text', newText);
    }
  };

  // Initialize height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 min-w-[240px] shadow-lg hover:shadow-xl transition-all duration-200">
      {/* Node Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">Text</h3>
      </div>

      {/* Text Input */}
      <div className="space-y-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here... Use {{variable}} for dynamic inputs"
          className="w-full px-2.5 py-1.5 text-sm bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30
                   hover:bg-gray-800/50 transition-colors resize-none min-h-[60px]"
          style={{ overflow: 'hidden' }}
        />
      </div>

      {/* Variable Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-input-${variable}`}
          style={{
            top: `${25 + (index * 20)}%`,
            backgroundColor: '#4F46E5',
            width: '8px',
            height: '8px',
            border: '2px solid #312E81'
          }}
        >
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 whitespace-nowrap"
            style={{ marginLeft: '8px' }}
          >
            {variable}
          </div>
        </Handle>
      ))}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-2 h-2 !bg-indigo-500 border-2 border-indigo-700"
      />
    </div>
  );
};
