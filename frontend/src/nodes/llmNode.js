import BaseNode from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      type="LLM"
      description="This is a LLM."
      inputs={[
        { id: `${id}-system`, position: 'left', label: 'System' },
        { id: `${id}-prompt`, position: 'left', label: 'Prompt' }
      ]}
      outputs={[{ id: `${id}-response`, position: 'right', label: 'Response' }]}
      data={data}
    />
  );
};
