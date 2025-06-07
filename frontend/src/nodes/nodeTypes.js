import { createNode } from './NodeFactory';

// Text Node
export const TextNode = createNode({
  type: 'Text',
  fields: [
    {
      name: 'text',
      label: 'Content',
      type: 'textarea',
      defaultValue: '{{input}}'
    }
  ],
  getHandles: (id) => ({
    inputs: [],  // Dynamic inputs will be added based on variables
    outputs: [
      {
        id: `${id}-output`,
        position: 'right'
      }
    ]
  })
});

// Input Node
export const InputNode = createNode({
  type: 'Input',
  badge: 'Source',
  fields: [
    {
      name: 'inputType',
      label: 'Input Type',
      type: 'select',
      options: ['Text', 'Number', 'File', 'JSON'],
      defaultValue: 'Text'
    },
    {
      name: 'defaultValue',
      label: 'Default Value',
      type: 'text'
    }
  ],
  getHandles: (id) => ({
    inputs: [],
    outputs: [
      {
        id: `${id}-output`,
        position: 'right'
      }
    ]
  })
});

// Output Node
export const OutputNode = createNode({
  type: 'Output',
  badge: 'Sink',
  fields: [
    {
      name: 'format',
      label: 'Output Format',
      type: 'select',
      options: ['Plain Text', 'JSON', 'CSV', 'HTML'],
      defaultValue: 'Plain Text'
    }
  ],
  getHandles: (id) => ({
    inputs: [
      {
        id: `${id}-input`,
        position: 'left'
      }
    ],
    outputs: []
  })
});

// LLM Node
export const LLMNode = createNode({
  type: 'LLM',
  badge: 'AI',
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      options: ['GPT-4', 'GPT-3.5', 'Claude', 'PaLM'],
      defaultValue: 'GPT-4'
    },
    {
      name: 'prompt',
      label: 'System Prompt',
      type: 'textarea'
    },
    {
      name: 'temperature',
      label: 'Temperature',
      type: 'text',
      defaultValue: '0.7'
    }
  ],
  getHandles: (id) => ({
    inputs: [
      {
        id: `${id}-input`,
        position: 'left'
      }
    ],
    outputs: [
      {
        id: `${id}-output`,
        position: 'right'
      }
    ]
  })
});

// Data Transform Node
export const TransformNode = createNode({
  type: 'Transform',
  badge: 'Data',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      options: ['Map', 'Filter', 'Reduce', 'Sort', 'Group'],
      defaultValue: 'Map'
    },
    {
      name: 'transform',
      label: 'Transform Function',
      type: 'textarea',
      placeholder: '(x) => x'
    }
  ],
  getHandles: (id) => ({
    inputs: [
      {
        id: `${id}-input`,
        position: 'left'
      }
    ],
    outputs: [
      {
        id: `${id}-output`,
        position: 'right'
      }
    ]
  })
});

// API Node
export const APINode = createNode({
  type: 'API',
  badge: 'HTTP',
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      defaultValue: 'GET'
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      placeholder: 'https://api.example.com'
    },
    {
      name: 'headers',
      label: 'Headers',
      type: 'textarea',
      placeholder: '{\n  "Content-Type": "application/json"\n}'
    }
  ],
  getHandles: (id) => ({
    inputs: [
      {
        id: `${id}-input`,
        position: 'left',
        label: 'Request Body'
      }
    ],
    outputs: [
      {
        id: `${id}-output`,
        position: 'right',
        label: 'Response'
      }
    ]
  })
});

// Database Node
export const DatabaseNode = createNode({
  type: 'Database',
  badge: 'Storage',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      options: ['Query', 'Insert', 'Update', 'Delete'],
      defaultValue: 'Query'
    },
    {
      name: 'query',
      label: 'SQL Query',
      type: 'textarea',
      placeholder: 'SELECT * FROM table'
    }
  ],
  getHandles: (id) => ({
    inputs: [
      {
        id: `${id}-input`,
        position: 'left',
        label: 'Parameters'
      }
    ],
    outputs: [
      {
        id: `${id}-output`,
        position: 'right',
        label: 'Results'
      }
    ]
  })
});

// Export all node types
export const nodeTypes = {
  text: TextNode,
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  transform: TransformNode,
  api: APINode,
  database: DatabaseNode
}; 