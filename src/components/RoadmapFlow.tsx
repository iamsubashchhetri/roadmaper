import React, { useCallback, useEffect } from 'react';
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
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRoadmapStore } from '../store/roadmapStore';
import CustomNode from './CustomNode';
import { topicsData } from '../data/roadmaps';
import { Topic } from '../types';

const nodeTypes: NodeTypes = {
  default: CustomNode,
  input: CustomNode,
  output: CustomNode,
  process: CustomNode  // Add the 'process' node type
};

const RoadmapFlow: React.FC = () => {
  const { currentRoadmap, setSelectedTopic } = useRoadmapStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Update nodes and edges when currentRoadmap changes
  useEffect(() => {
    if (currentRoadmap) {
      setNodes(currentRoadmap.nodes);
      setEdges(currentRoadmap.edges);
    }
  }, [currentRoadmap, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const label = node.data.label;

    // Check if we have predefined content for this topic
    const topicData = topicsData[label as keyof typeof topicsData];

    if (topicData) {
      const topic: Topic = {
        id: topicData.id,
        title: topicData.title,
        description: topicData.description,
        content: topicData.content
      };
      setSelectedTopic(topic);
    } else {
      // For dynamically generated roadmaps, create a topic on the fly
      const topic: Topic = {
        id: `topic-${Date.now()}`,
        title: label,
        description: node.data.description || `Details about ${label}`,
        // Content will be generated dynamically
      };
      setSelectedTopic(topic);
    }
  }, [setSelectedTopic]);

  if (!currentRoadmap) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Please select a roadmap to view or generate a new one</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default RoadmapFlow;