import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CustomNode = memo(({ data, selected }: NodeProps) => {
  // Define node type colors
  const getNodeStyle = () => {
    const baseStyle = 'px-3 py-2 md:px-5 md:py-4 rounded-lg shadow-md border-2 transition-all duration-300 max-w-xs min-w-[140px] md:min-w-[180px] m-1 text-sm md:text-base';

    if (selected) {
      return `${baseStyle} bg-blue-50 border-blue-500 dark:bg-blue-900 dark:border-blue-400 animate-pulse-slow`;
    }

    switch (data.type) {
      case 'input':
        return `${baseStyle} bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-400 animate-float`;
      case 'output':
        return `${baseStyle} bg-purple-50 border-purple-500 dark:bg-purple-900 dark:border-purple-400 animate-float`;
      default:
        return `${baseStyle} bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600`;
    }
  };

  return (
    <div className={getNodeStyle()}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />

      <div className="text-center">
        <div className="font-semibold text-gray-900 dark:text-white mb-1">{data.label}</div>
        {data.description && (
          <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {data.description}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;