import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
  Handle,
  Position,
  NodeProps,
  BackgroundVariant,
  useReactFlow,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
import { useRoadmapStore } from "../store/roadmapStore";
import { topicsData } from "../data/roadmaps";
import { Topic } from "../types";

// Custom node component for better information display and vertical layout
const CustomNode = ({ data, isConnectable, type }: NodeProps) => {
  const isInput = type === 'input';
  const isOutput = type === 'output';

  // Color mapping based on node type
  const bgColor = type === 'input' 
    ? 'rgb(199, 235, 223)' 
    : (type === 'output' 
      ? 'rgb(228, 216, 253)' 
      : 'rgb(255, 255, 255)');

  const darkBgColor = type === 'input'
    ? 'rgb(25, 97, 78, 0.3)'
    : (type === 'output'
      ? 'rgb(95, 55, 179, 0.3)'
      : 'rgb(30, 41, 59, 0.8)');

  return (
    <div 
      className={`custom-node ${type}-node`}
      style={{ 
        backgroundColor: bgColor,
        width: '180px',
        padding: '12px',
        borderRadius: '8px',
        border: `1px solid ${type === 'input' ? '#9BE0C8' : (type === 'output' ? '#C8B4F5' : '#e2e8f0')}`,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease'
      }}
    >
      {!isInput && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={{ backgroundColor: '#6366F1', width: '8px', height: '8px', top: '-4px' }}
        />
      )}
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold',
          marginBottom: '0.5rem', 
          color: '#3B82F6',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {data.label}
        </h3>
        {data.description && (
          <p style={{ 
            fontSize: '12px', 
            color: '#6B7280',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {data.description}
          </p>
        )}
      </div>
      {!isOutput && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          style={{ backgroundColor: '#6366F1', width: '8px', height: '8px', bottom: '-4px' }}
        />
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  default: CustomNode,
  input: CustomNode,
  output: CustomNode,
};

const RoadmapFlow: React.FC = () => {
  const { selectedRoadmap, setSelectedTopic } = useRoadmapStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  // Load roadmap data when selectedRoadmap changes
  useEffect(() => {
    if (selectedRoadmap) {
      const roadmapFlow = generateRoadmapFlow(selectedRoadmap);
      setNodes(roadmapFlow.nodes);
      setEdges(roadmapFlow.edges);

      // Allow the component to render before fitting view
      setTimeout(() => {
        fitView({ padding: 0.2, includeHiddenNodes: false });
      }, 100);
    }
  }, [selectedRoadmap, setNodes, setEdges, fitView]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({
      ...connection,
      animated: Math.random() > 0.7, // Random animation for some connections
      style: { stroke: '#6366F1', strokeWidth: 2 }
    }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // Extract topic ID from node ID (format: "topic-123")
      if (node.id.startsWith("topic-")) {
        const topicId = node.id.split("-")[1];
        setSelectedTopic(topicId);
      }
    },
    [setSelectedTopic]
  );

  const centerView = useCallback(() => {
    fitView({ padding: 0.2, duration: 800 });
  }, [fitView]);

  return (
    <div className="h-full w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
      {nodes.length > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
          connectionMode={ConnectionMode.Loose}
          proOptions={{ hideAttribution: false }}
          minZoom={0.1}
          maxZoom={1.5}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { strokeWidth: 2 },
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#6366F1"
            className="opacity-30"
          />
          <Controls className="bg-white dark:bg-gray-800 shadow-md rounded-md border border-gray-200 dark:border-gray-700" />
          <Panel position="top-right" className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md border border-gray-200 dark:border-gray-700">
            <button 
              onClick={centerView}
              className="px-3 py-1 bg-indigo-500 text-white rounded-md text-sm hover:bg-indigo-600 transition-colors"
            >
              Center View
            </button>
          </Panel>
          <MiniMap
            nodeColor={(n) => {
              if (n.type === 'input') return '#D1FAE5';
              if (n.type === 'output') return '#E4D8FD';
              return '#fff';
            }}
            className="hidden md:block"
            zoomable
            pannable
          />
        </ReactFlow>
      ) : null}
    </div>
  );
};

export default RoadmapFlow;

// Placeholder function -  replace with your actual implementation
const generateRoadmapFlow = (selectedRoadmap: any) => {
  //This is a placeholder, replace with your actual logic to generate nodes and edges from selectedRoadmap
  return { nodes: [], edges: [] };
};