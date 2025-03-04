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
} from "reactflow";
import "reactflow/dist/style.css";
import { useRoadmapStore } from "../store/roadmapStore";
import CustomNode from "./CustomNode";
import { topicsData } from "../data/roadmaps";
import { Topic } from "../types";

const nodeTypes: NodeTypes = {
  default: CustomNode,
  input: CustomNode,
  output: CustomNode,
  process: CustomNode, // Add the missing 'process' node type
};

const RoadmapFlow: React.FC = () => {
  const { currentRoadmap, setSelectedTopic } =
    useRoadmapStore();
  const [selectedTopic, setSelectedTopicState] = useState<Node | null>(null); // Added state to track selected node

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
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.data && node.data.label) {
        // Only update if selecting a different node
        if (!selectedTopic || selectedTopic.id !== node.id) {
          setSelectedTopicState(node); // Update the state to track the selected node
          setSelectedTopic(node);
          // setSelectedTopicForNotes(node.data.label);  Removed this line
        }
      }
    },
    [setSelectedTopic, selectedTopic],
  );

  if (!currentRoadmap) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-blue-100/50 dark:border-indigo-800/50">
        {/* Main title at the top center */}
        <div className="w-full text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x tracking-tight">
            Map your plans
          </h2>
          <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="relative w-full h-64 md:h-80 overflow-hidden mb-10 md:mb-12 flex justify-center items-center">
          {/* Central design element */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-20 h-20 md:w-32 md:h-32 cursor-pointer transition-transform duration-300 hover:scale-110 floating-element">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90 animate-pulse-slow"></div>
              <div className="absolute inset-1 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm flex items-center justify-center hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-indigo-900 transition-all duration-300 animate-float text-center">
                <svg
                  className="w-8 h-8 md:w-14 md:h-14 mx-auto text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 animate-rotate"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.5H15M19.5 12C19.5 13.3132 19.2362 14.6136 18.7388 15.8268C18.2413 17.0401 17.5215 18.1425 16.6213 19.0607C15.7212 19.9789 14.6378 20.7142 13.4393 21.2239C12.2408 21.7335 10.9562 22 9.65625 22C8.3563 22 7.07174 21.7335 5.87326 21.2239C4.67478 20.7142 3.59136 19.9789 2.69121 19.0607C1.79107 18.1425 1.07132 17.0401 0.573853 15.8268C0.0763791 14.6136 -0.1875 13.3132 -0.1875 12C-0.1875 9.34784 0.852623 6.8043 2.69121 4.93934C4.52979 3.07437 7.02826 2 9.65625 2C12.2842 2 14.7827 3.07437 16.6213 4.93934C18.4599 6.8043 19.5 9.34784 19.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 2L10 12L7 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-blue-600 dark:text-blue-400 text-xs md:text-base mb-0 mt-1 md:mt-2 font-medium">
                  Learning Paths
                </p>
              </div>
            </div>
          </div>

          {/* Floating elements - Mobile responsive */}
          <div className="absolute left-[5%] md:left-[12%] top-[15%] animate-float-slow floating-element">
            <div className="relative w-16 h-16 md:w-24 md:h-24">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70 blur"></div>
              <div className="absolute inset-1 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-8 h-8 md:w-10 md:h-12 text-cyan-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute right-[8%] md:right-[15%] top-[20%] md:top-[15%] animate-float-medium floating-element">
            <div className="relative w-14 h-14 md:w-20 md:h-20">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 opacity-70 blur"></div>
              <div className="absolute inset-1 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-7 h-7 md:w-10 md:h-10 text-violet-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 11.25L10.5 14.25L16.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.15997 6.75V3.75C8.15997 3.55109 8.23902 3.36032 8.37967 3.21967C8.52032 3.07902 8.71107 3 8.90997 3H15.09C15.2889 3 15.4796 3.07902 15.6203 3.21967C15.7609 3.36032 15.84 3.55109 15.84 3.75V6.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute left-[8%] md:left-[18%] bottom-[2%] md:bottom-[1%] animate-float-medium floating-element">
            <div className="relative w-20 h-20 md:w-28 md:h-28">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-70 blur"></div>
              <div className="absolute inset-1 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-10 h-10 md:w-14 md:h-14 text-indigo-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 4.5H6.75C5.50736 4.5 4.5 5.50736 4.5 6.75V17.25C4.5 18.4926 5.50736 19.5 6.75 19.5H17.25C18.4926 19.5 19.5 18.4926 19.5 17.25V6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H16.5M7.5 4.5V3.75C7.5 2.50736 8.50736 1.5 9.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V4.5M7.5 4.5H16.5M9 12L11.25 14.25L15.75 9.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 mb-6 md:mb-8 px-4">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
            Select or Create a Learning Path
          </h3>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Explore AI-generated roadmaps that guide you through any tech skill
            with clear steps from beginner to expert.
          </p>
        </div>

        {/* Community Statistics Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-100/50 dark:border-indigo-800/50 shadow-lg max-w-4xl mx-auto mt-10">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
              Join the Community
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              AI roadmap generator is the 65th most starred project on GitHub
              and is visited by hundreds of thousands of developers every month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* GitHub Stars */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/20 z-0"></div>
              <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 z-0"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                    Rank 65th
                  </h4>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">
                    out of 2000
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400">
                    3K
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                    GitHub Stars
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group-hover:underline"
                  >
                    Star us on GitHub
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Help us reach #1
                  </p>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">
                    +9000 every month
                  </p>
                </div>
              </div>
            </div>

            {/* Registered Users */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 p-5 rounded-xl border border-purple-100 dark:border-purple-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full bg-purple-500/10 dark:bg-purple-500/20 z-0"></div>
              <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 z-0"></div>

              <div className="relative z-10">
                <div className="mb-2">
                  <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                    Registered Users
                  </h4>
                </div>

                <div className="mt-3">
                  <p className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">
                    +10K
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                    Developers
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors group-hover:underline"
                  >
                    Register yourself
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Commit to your growth
                  </p>
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">
                    +2k every month
                  </p>
                </div>
              </div>
            </div>

            {/* Discord Members */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 p-5 rounded-xl border border-blue-100 dark:border-blue-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/20 z-0"></div>
              <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-500/20 z-0"></div>

              <div className="relative z-10">
                <div className="mb-2">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Discord Members
                  </h4>
                </div>

                <div className="mt-3">
                  <p className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400">
                    34K
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                    Community Members
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:underline"
                  >
                    Join on Discord
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Join the community
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap-container h-[50vh] md:h-[70vh]">
      {currentRoadmap ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          proOptions={{ hideAttribution: true }}
          attributionPosition="bottom-right"
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultzoom={0.8}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
        >
          <Background color="#aaa" gap={16} />
          <Controls
            showInteractive={false}
            className="react-flow__controls-mobile"
          />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.id === selectedTopic?.id) return "#6366F1";
              return "#555";
            }}
            nodeColor={(n) => {
              if (n.id === selectedTopic?.id) return "#818CF8";
              if (n.type === "input") return "#C7EBDF";
              if (n.type === "output") return "#E4D8FD";
              return "#fff";
            }}
            className="hidden md:block"
          />
        </ReactFlow>
      ) : null}
    </div>
  );
};

export default RoadmapFlow;