import React from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  return (
    <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 min-w-[240px] shadow-lg hover:shadow-xl transition-all duration-200">
      {/* Node Title and Badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">Input</h3>
        <span className="px-2 py-1 text-xs font-medium bg-emerald-900/50 text-emerald-400 rounded-full">
          Source
        </span>
      </div>

      {/* Node Content */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-400">
            Input Type
          </label>
          <select 
            className="w-full px-2.5 py-1.5 text-sm bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30
                     hover:bg-gray-800/50 transition-colors appearance-none cursor-pointer"
            value={data?.inputType || 'Text'}
            onChange={(e) => data?.onChange?.(id, 'inputType', e.target.value)}
          >
            <option value="Text" className="text-gray-300 bg-gray-900">Text</option>
            <option value="Number" className="text-gray-300 bg-gray-900">Number</option>
            <option value="File" className="text-gray-300 bg-gray-900">File</option>
            <option value="JSON" className="text-gray-300 bg-gray-900">JSON</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-400">
            Default Value
          </label>
          <input
            type="text"
            className="w-full px-2.5 py-1.5 text-sm bg-gray-900/50 border border-gray-700/50 rounded-lg text-gray-300
                     focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30
                     hover:bg-gray-800/50 transition-colors
                     placeholder-gray-500"
            value={data?.defaultValue || ''}
            onChange={(e) => data?.onChange?.(id, 'defaultValue', e.target.value)}
            placeholder="Enter default value..."
          />
        </div>
      </div>

      {/* Node Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="w-3 h-3 -right-1.5 !bg-emerald-500 border-2 border-emerald-700"
      />
    </div>
  );
};
