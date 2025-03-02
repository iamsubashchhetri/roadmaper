import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

const CustomNode: React.FC<NodeProps> = ({ data, selected, targetPosition = Position.Top, sourcePosition = Position.Bottom }) => {
  // Determine node type for styling
  const isRoot = data.type === "input";
  const isLeaf = data.type === "output";

  // Styling based on node type
  const getBgColor = () => {
    if (isRoot) return "bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40";
    if (isLeaf) return "bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40";
    return "bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40";
  };

  const getBorderColor = () => {
    if (isRoot) return selected ? "border-green-500" : "border-green-200 dark:border-green-800";
    if (isLeaf) return selected ? "border-blue-500" : "border-blue-200 dark:border-blue-800";
    return selected ? "border-indigo-500" : "border-indigo-200 dark:border-indigo-800";
  };

  const getTitleColor = () => {
    if (isRoot) return "text-green-700 dark:text-green-400";
    if (isLeaf) return "text-blue-700 dark:text-blue-400";
    return "text-indigo-700 dark:text-indigo-400";
  };

  return (
    <div
      className={`custom-node ${data.type || "default-node"} ${getBgColor()} backdrop-blur-sm`}
      style={{
        width: "180px",
        padding: "12px",
        borderRadius: "8px",
        border: `1px solid`,
        borderColor: getBorderColor(),
        boxShadow: selected
          ? "0px 4px 12px rgba(99, 102, 241, 0.2)"
          : "0px 2px 5px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Handle
        type="target"
        position={targetPosition}
        style={{
          backgroundColor: selected ? "rgb(99, 102, 241)" : "rgb(129, 140, 248)",
          width: "8px",
          height: "8px",
          [targetPosition === Position.Top ? "top" : "left"]: "-4px",
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h3
          className={`font-bold mb-2 ${getTitleColor()} overflow-hidden text-ellipsis`}
          style={{
            fontSize: "14px",
          }}
        >
          {data.label}
        </h3>
        <p
          className="text-xs text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.description || "No description available"}
        </p>
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        style={{
          backgroundColor: selected ? "rgb(99, 102, 241)" : "rgb(129, 140, 248)",
          width: "8px",
          height: "8px",
          [sourcePosition === Position.Bottom ? "bottom" : "right"]: "-4px",
        }}
      />
    </div>
  );
};

export default CustomNode;