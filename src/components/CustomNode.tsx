import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CustomNode = memo(({ data, selected }: NodeProps) => {
  // Define node type colors with vibrant gradients
  const getNodeStyle = () => {
    const baseStyle = 'px-3 py-2 md:px-5 md:py-4 rounded-lg shadow-md border transition-all duration-300 max-w-xs min-w-[140px] md:min-w-[180px] m-1 text-sm md:text-base hover:shadow-xl hover:transform hover:scale-105';

    if (selected) {
      return `${baseStyle} bg-gradient-to-br from-blue-400 to-indigo-500 border-blue-500 dark:border-blue-400 text-white animate-pulse-slow`;
    }

    switch (data.type) {
      case 'input':
        return `${baseStyle} bg-gradient-to-br from-emerald-300 to-green-500 border-green-600 dark:border-green-400 text-white animate-float`;
      case 'output':
        return `${baseStyle} bg-gradient-to-br from-purple-300 to-violet-500 border-purple-600 dark:border-purple-400 text-white animate-float`;
      default:
        return `${baseStyle} bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-indigo-300 hover:from-blue-100 hover:to-indigo-200 dark:from-slate-700 dark:to-slate-800 dark:border-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-700`;
    }
  };

  // Define text styles based on node type
  const getTitleStyle = () => {
    if (selected) {
      return "font-bold text-white mb-1";
    }
    
    switch (data.type) {
      case 'input':
      case 'output':
        return "font-bold text-white mb-1";
      default:
        return "font-semibold text-indigo-600 dark:text-indigo-300 mb-1";
    }
  };

  const getDescriptionStyle = () => {
    if (selected || data.type === 'input' || data.type === 'output') {
      return "text-xs text-white text-opacity-90 line-clamp-2";
    }
    return "text-xs text-gray-700 dark:text-gray-300 line-clamp-2";
  };

  return (
    <div className={getNodeStyle()}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-indigo-500 hover:bg-indigo-400 hover:w-4 hover:h-4 transition-all" 
      />

      <div className="text-center">
        <div className={getTitleStyle()}>{data.label}</div>
        {data.description && (
          <div className={getDescriptionStyle()}>
            {data.description}
          </div>
        )}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-indigo-500 hover:bg-indigo-400 hover:w-4 hover:h-4 transition-all" 
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;