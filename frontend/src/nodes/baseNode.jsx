import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const getPosition = (pos) => {
  switch (pos) {
    case 'top':
      return Position.Top;
    case 'bottom':
      return Position.Bottom;
    case 'left':
      return Position.Left;
    case 'right':
    default:
      return Position.Right;
  }
};

const BaseNode = ({ id, type, fields = [], inputs = [], outputs = [], data = {} }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    setFormData(initialData);
  }, [fields, data]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ width: 220, border: '1px solid #ccc', padding: 10, borderRadius: 8, backgroundColor: '#f9f9f9' }}>
      {/* Input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={index}
          type="target"
          position={getPosition(input.position)}
          id={input.id}
          style={{ top: 15 + index * 20 }}
        />
      ))}

      <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{type}</div>

      {/* Dynamic fields */}
      {fields.map((field, idx) => (
        <div key={idx} style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12 }}>{field.label}:</label>
          {field.type === 'text' && (
            <input
              type="text"
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field.name)}
              style={{ width: '100%', fontSize: 12 }}
            />
          )}
          {field.type === 'select' && (
            <select
              value={formData[field.name] || field.options[0]}
              onChange={(e) => handleChange(e, field.name)}
              style={{ width: '100%', fontSize: 12 }}
            >
              {field.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      {/* Output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={index}
          type="source"
          position={getPosition(output.position)}
          id={output.id}
          style={{ bottom: 10 + index * 20 }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
