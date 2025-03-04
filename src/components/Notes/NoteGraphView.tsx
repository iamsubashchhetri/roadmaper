
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css';

const NoteGraphView: React.FC = () => {
  const { notes, links } = useNotesStore();
  const navigate = useNavigate();
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  useEffect(() => {
    const nodeList: Node[] = Object.values(notes).map(note => ({
      id: note.id,
      data: { label: note.title },
      position: {
        x: Math.random() * 800,
        y: Math.random() * 600
      },
      style: {
        background: '#f5f5f5',
        color: '#333',
        border: '1px solid #ddd',
        borderRadius: '5px',
        width: 180,
        textAlign: 'center',
        fontSize: '12px'
      }
    }));
    
    const edgeList: Edge[] = links.map(link => ({
      id: `${link.source}-${link.target}`,
      source: link.source,
      target: link.target,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6366f1' }
    }));
    
    setNodes(nodeList);
    setEdges(edgeList);
  }, [notes, links]);
  
  const onNodeClick: NodeMouseHandler = (event, node) => {
    navigate(`/notes/${node.id}`);
  };
  
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap 
          nodeStrokeColor={(n) => '#6366f1'}
          nodeColor={(n) => '#fff'}
          nodeBorderRadius={2}
        />
      </ReactFlow>
    </div>
  );
};

export default NoteGraphView;
