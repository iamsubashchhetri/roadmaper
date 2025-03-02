import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CustomNode: React.FC<NodeProps> = ({ data, isConnectable, selected, sourcePosition, targetPosition }) => {
  // Use the dynamically passed positions or fall back to top/bottom for tree structure
  const sourcePos = sourcePosition || Position.Bottom;
  const targetPos = targetPosition || Position.Top;

  return (
    <div
      className={`custom-node ${data.type || 'default-node'} ${selected ? 'selected-node' : ''}`}
      style={{
        backgroundColor: selected ? '#F5F3FF' : 'white',
        width: '180px',
        padding: '12px',
        borderRadius: '8px',
        border: selected ? '1px solid #818CF8' : '1px solid #E2E8F0',
        boxShadow: selected ? '0 3px 10px rgba(99, 102, 241, 0.2)' : '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        transform: selected ? 'translateY(-2px)' : 'none',
      }}
    >
      <Handle
        type="target"
        position={targetPos}
        style={{ 
          backgroundColor: '#6366F1', 
          width: '8px', 
          height: '8px', 
          [targetPos === Position.Top ? 'top' : 'bottom']: '-4px',
          [targetPos === Position.Left ? 'left' : 'right']: targetPos === Position.Left || targetPos === Position.Right ? '-4px' : 'auto',
        }}
        isConnectable={isConnectable}
      />
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem', 
          color: selected ? '#4F46E5' : '#3B82F6', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' 
        }}>
          {data.label}
        </h3>
        <p style={{ 
          fontSize: '12px', 
          color: selected ? '#4B5563' : '#6B7280', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical' 
        }}>
          {data.description}
        </p>
      </div>
      <Handle
        type="source"
        position={sourcePos}
        style={{ 
          backgroundColor: '#6366F1', 
          width: '8px', 
          height: '8px',
          [sourcePos === Position.Bottom ? 'bottom' : 'top']: sourcePos === Position.Bottom || sourcePos === Position.Top ? '-4px' : 'auto',
          [sourcePos === Position.Left ? 'left' : 'right']: sourcePos === Position.Left || sourcePos === Position.Right ? '-4px' : 'auto',
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default CustomNode;