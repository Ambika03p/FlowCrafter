import React from 'react';

const NodeIcon = ({ type, color }) => {
  const getIcon = () => {
    switch (type) {
      case 'text':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5h16v2H4zm0 6h16v2H4zm0 6h10v2H4z"/>
          </svg>
        );
      case 'input':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5v14h16v-6h-2v4H6V7h12v4h2V5z"/>
            <path d="M15 13v-2H9v2z"/>
          </svg>
        );
      case 'output':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 5v14H4v-6h2v4h12V7H6v4H4V5z"/>
            <path d="M9 13v-2h6v2z"/>
          </svg>
        );
      case 'llm':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        );
      case 'transform':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5zM19 19.09H5V4.91h14v14.18z"/>
          </svg>
        );
      case 'api':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6z"/>
          </svg>
        );
      case 'database':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 3.79 5 6v12c0 2.21 3.13 4 7 4s7-1.79 7-4V6c0-2.21-3.13-4-7-4zm5 16c0 1.1-2.24 2-5 2s-5-.9-5-2v-2.23c1.04.77 2.87 1.23 5 1.23s3.96-.46 5-1.23V18zm0-4c0 1.1-2.24 2-5 2s-5-.9-5-2v-2.23c1.04.77 2.87 1.23 5 1.23s3.96-.46 5-1.23V14zm-5-6c2.76 0 5-.9 5-2s-2.24-2-5-2-5 .9-5 2 2.24 2 5 2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`w-4 h-4 rounded flex items-center justify-center shadow-sm transform transition-all duration-200 group-hover:scale-110 text-white`}
      style={{ backgroundColor: color }}
    >
      {getIcon()}
    </div>
  );
};

const ConnectionHandle = ({ position, darkMode }) => (
  <div 
    className={`absolute w-2 h-2 rounded-full 
                ${darkMode ? 'bg-gray-600 group-hover:bg-gray-500' : 'bg-gray-300 group-hover:bg-gray-400'} 
                transition-colors duration-200
                ${position === 'left' ? 'left-0 top-1/2 -translate-x-1/2' : 'right-0 top-1/2 translate-x-1/2'} 
                -translate-y-1/2`}
  />
);

const getNodeDescription = (type) => {
  switch (type) {
    case 'text':
      return 'Process Text';
    case 'input':
      return 'Data Input';
    case 'output':
      return 'Data Output';
    case 'llm':
      return 'Language Model';
    case 'transform':
      return 'Data Transform';
    case 'api':
      return 'API Endpoint';
    case 'database':
      return 'Store Data';
    default:
      return '';
  }
};

export const DraggableNode = ({ type, label, iconColor, badge, darkMode = false }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-md
                 ${darkMode ? 'bg-[#242424] hover:bg-[#2a2a2a]' : 'bg-white hover:bg-gray-50'}
                 border border-transparent ${darkMode ? 'hover:border-gray-700' : 'hover:border-gray-200'}
                 shadow-sm hover:shadow
                 transition-all duration-200 ease-in-out
                 cursor-grab active:cursor-grabbing`}
      draggable
      onDragStart={onDragStart}
    >
      <ConnectionHandle position="left" darkMode={darkMode} />
      <NodeIcon type={type} color={iconColor} />
      <span className={`text-sm font-medium ${darkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-900 group-hover:text-gray-800'} transition-colors`}>
        {label}
      </span>
      {badge && (
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full
                       ${darkMode ? 'bg-[#333333] text-gray-300 group-hover:bg-[#404040] group-hover:text-white' : 'bg-gray-100 text-gray-800 group-hover:bg-gray-200 group-hover:text-gray-900'}
                       transition-colors duration-200`}>
          {badge}
        </span>
      )}
      <ConnectionHandle position="right" darkMode={darkMode} />
    </div>
  );
};
