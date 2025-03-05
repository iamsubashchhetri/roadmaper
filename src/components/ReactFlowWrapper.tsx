
import React from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

// Define custom node types if needed
const nodeTypes = {
  // Register your custom node types here
  // Example: customNode: CustomNodeComponent
};

interface ReactFlowWrapperProps {
  nodes: any[];
  edges: any[];
  onNodesChange?: any;
  onEdgesChange?: any;
  onConnect?: any;
  onNodeClick?: any;
}

const ReactFlowWrapper: React.FC<ReactFlowWrapperProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick
}) => {
  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
