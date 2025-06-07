import React, { useState, useEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { colors, spacing, borderRadius, shadows, transitions, typography } from '../theme';

// Shared styles for all nodes
const nodeStyles = {
  container: {
    minWidth: 240,
    padding: spacing.lg,
    border: `2px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg,
    backgroundColor: '#ffffff',
    boxShadow: shadows.md,
    fontFamily: typography.fontFamily,
    transition: transitions.fast,
    '&:hover': {
      boxShadow: shadows.lg,
      borderColor: colors.gray[300],
    },
    '&.selected': {
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 2px ${colors.primary[100]}`,
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing.md,
    padding: `${spacing.xs} 0`,
    borderBottom: `1px solid ${colors.gray[200]}`
  },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.gray[800],
    flex: 1
  },
  badge: {
    fontSize: typography.sizes.xs,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray[100],
    color: colors.gray[600],
    fontWeight: typography.weights.medium
  },
  fieldContainer: {
    marginBottom: spacing.sm
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
    display: 'block',
    fontWeight: typography.weights.medium
  },
  input: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.sizes.sm,
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md,
    transition: transitions.fast,
    backgroundColor: colors.gray[50],
    color: colors.gray[900],
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      backgroundColor: '#ffffff',
      boxShadow: `0 0 0 3px ${colors.primary[100]}`
    },
    '&:hover:not(:focus)': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[100]
    },
    '&::placeholder': {
      color: colors.gray[400]
    }
  },
  select: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.sizes.sm,
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[50],
    color: colors.gray[900],
    cursor: 'pointer',
    transition: transitions.fast,
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      backgroundColor: '#ffffff',
      boxShadow: `0 0 0 3px ${colors.primary[100]}`
    },
    '&:hover:not(:focus)': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[100]
    }
  },
  textarea: {
    width: '100%',
    padding: `${spacing.sm} ${spacing.md}`,
    fontSize: typography.sizes.sm,
    border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[50],
    color: colors.gray[900],
    resize: 'vertical',
    minHeight: '80px',
    transition: transitions.fast,
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      backgroundColor: '#ffffff',
      boxShadow: `0 0 0 3px ${colors.primary[100]}`
    },
    '&:hover:not(:focus)': {
      borderColor: colors.gray[400],
      backgroundColor: colors.gray[100]
    },
    '&::placeholder': {
      color: colors.gray[400]
    }
  },
  handle: {
    width: '12px',
    height: '12px',
    backgroundColor: colors.primary[500],
    border: `2px solid #ffffff`,
    boxShadow: shadows.sm,
    transition: transitions.fast,
    '&:hover': {
      backgroundColor: colors.primary[600],
      transform: 'scale(1.2)',
    }
  }
};

// Create a node component with the given configuration
export const createNode = (config) => {
  const {
    type,
    fields = [],
    defaultData = {},
    validateData = () => true,
    processData = (data) => data,
    getHandles = () => ({ inputs: [], outputs: [] })
  } = config;

  return function CustomNode({ id, data, selected }) {
    const [nodeData, setNodeData] = useState(data || defaultData);
    const [dynamicHandles, setDynamicHandles] = useState({ inputs: [], outputs: [] });

    useEffect(() => {
      if (type === 'Text' && nodeData.text) {
        const variableRegex = /\{\{([^}]+)\}\}/g;
        const matches = [...nodeData.text.matchAll(variableRegex)];
        const newInputs = matches.map(match => ({
          id: `${id}-input-${match[1].trim()}`,
          label: match[1].trim(),
          position: 'left'
        }));
        setDynamicHandles(prev => ({ ...prev, inputs: newInputs }));
      }
    }, [nodeData.text, id, type]);

    const staticHandles = useMemo(() => {
      const handles = getHandles(id, nodeData);
      return {
        inputs: Array.isArray(handles.inputs) ? handles.inputs : [],
        outputs: Array.isArray(handles.outputs) ? handles.outputs : []
      };
    }, [id, nodeData]);

    const handles = {
      inputs: [...(staticHandles.inputs || []), ...(dynamicHandles.inputs || [])],
      outputs: [...(staticHandles.outputs || [])]
    };

    const handleChange = (name, value) => {
      const newData = { ...nodeData, [name]: value };
      if (validateData(newData)) {
        const processedData = processData(newData);
        setNodeData(processedData);
      }
    };

    const renderField = (field) => {
      const { type: fieldType, name, label, options, placeholder } = field;
      const value = nodeData[name] || '';

      const baseInputClasses = "w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";
      
      switch (fieldType) {
        case 'select':
          return (
            <select
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
              className={`${baseInputClasses} cursor-pointer hover:bg-gray-50 pr-8`}
            >
              {options?.map((opt) => (
                <option key={opt.value || opt} value={opt.value || opt}>
                  {opt.label || opt}
                </option>
              ))}
            </select>
          );
        
        case 'textarea':
          return (
            <textarea
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={placeholder}
              className={`${baseInputClasses} min-h-[80px] resize-y hover:bg-gray-50`}
            />
          );
          
        default:
          return (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={placeholder}
              className={`${baseInputClasses} hover:bg-gray-50`}
            />
          );
      }
    };

    const getNodeColor = () => {
      switch (type.toLowerCase()) {
        case 'input': return 'border-green-500/50 bg-green-50/50';
        case 'output': return 'border-red-500/50 bg-red-50/50';
        case 'llm': return 'border-purple-500/50 bg-purple-50/50';
        case 'transform': return 'border-orange-500/50 bg-orange-50/50';
        case 'api': return 'border-cyan-500/50 bg-cyan-50/50';
        case 'database': return 'border-teal-500/50 bg-teal-50/50';
        default: return 'border-blue-500/50 bg-blue-50/50';
      }
    };

    const getBadgeColor = () => {
      switch (type.toLowerCase()) {
        case 'input': return 'bg-green-100 text-green-700';
        case 'output': return 'bg-red-100 text-red-700';
        case 'llm': return 'bg-purple-100 text-purple-700';
        case 'transform': return 'bg-orange-100 text-orange-700';
        case 'api': return 'bg-cyan-100 text-cyan-700';
        case 'database': return 'bg-teal-100 text-teal-700';
        default: return 'bg-blue-100 text-blue-700';
      }
    };

    return (
      <div className={`
        relative min-w-[280px] backdrop-blur-sm backdrop-saturate-200
        rounded-xl p-4 border-2 
        ${getNodeColor()}
        ${selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        shadow-lg shadow-black/5
        transition-all duration-200 ease-in-out
        hover:shadow-xl hover:scale-[1.02]
      `}>
        {/* Input handles */}
        {handles.inputs.map((input, idx) => (
          <Handle
            key={`input-${idx}`}
            type="target"
            position={Position.Left}
            id={input.id}
            className="w-3 h-3 -left-1.5 !bg-blue-500 border-2 border-white rounded-full shadow-md transition-transform duration-200 hover:scale-125"
            style={{ top: `${25 + (idx * 20)}%` }}
          />
        ))}

        {/* Node header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{type}</span>
            {config.badge && (
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getBadgeColor()}`}>
                {config.badge}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 font-mono">{id}</div>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-700 pl-1">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Output handles */}
        {handles.outputs.map((output, idx) => (
          <Handle
            key={`output-${idx}`}
            type="source"
            position={Position.Right}
            id={output.id}
            className="w-3 h-3 -right-1.5 !bg-blue-500 border-2 border-white rounded-full shadow-md transition-transform duration-200 hover:scale-125"
            style={{ top: `${25 + (idx * 20)}%` }}
          />
        ))}
      </div>
    );
  };
}; 