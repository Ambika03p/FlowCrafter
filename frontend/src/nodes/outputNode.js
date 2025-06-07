import React from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-4 min-w-[240px] shadow-lg">
      {/* Node Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-black">Output</h3>
        <span className="px-2 py-1 text-xs font-bold bg-black text-white rounded-full">
          Sink
        </span>
      </div>

      {/* Node Content */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-black">
            Output Format
          </label>
          <select 
            className="w-full px-2.5 py-1.5 text-sm bg-white border-2 border-black rounded-md text-black font-bold
                     focus:outline-none focus:ring-2 focus:ring-black
                     hover:bg-gray-50 transition-colors appearance-none"
            value={data?.outputFormat || 'Plain Text'}
            onChange={(e) => data?.onChange?.(id, 'outputFormat', e.target.value)}
          >
            <option value="Plain Text" className="text-black font-bold">Plain Text</option>
            <option value="JSON" className="text-black font-bold">JSON</option>
            <option value="CSV" className="text-black font-bold">CSV</option>
            <option value="XML" className="text-black font-bold">XML</option>
          </select>
        </div>
      </div>

      {/* Node Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        className="w-3 h-3 -left-1.5 !bg-black border-2 border-white"
      />
    </div>
  );
};
