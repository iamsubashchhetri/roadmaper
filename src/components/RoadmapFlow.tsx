import React, { useCallback, useEffect, useState } from 'react';
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
  process: CustomNode  // Add the missing 'process' node type
};

const RoadmapFlow: React.FC = () => {
  const { currentRoadmap, setSelectedTopic, setSelectedTopicForNotes } = useRoadmapStore();
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
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.data && node.data.label) {
      // Only update if selecting a different node
      if (!selectedTopic || selectedTopic.id !== node.id) {
        setSelectedTopicState(node); // Update the state to track the selected node
        setSelectedTopic(node);
        setSelectedTopicForNotes(node.data.label);
      }
    }
  }, [setSelectedTopic, setSelectedTopicForNotes, selectedTopic]);

  if (!currentRoadmap) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="w-full max-w-3xl text-center bg-white dark:bg-gray-800 p-5 md:p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">

          <div className="relative w-full h-64 md:h-72 overflow-hidden my-4 md:my-6">
            {/* Central design element */}
            <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-16 h-16 md:w-28 md:h-28 cursor-pointer transition-transform duration-300 hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90 animate-pulse-slow"></div>
                <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-all duration-300">
                  <div className="text-center">
                    <svg className="w-8 h-8 md:w-10 md:h-10 mx-auto text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.5H15M19.5 12C19.5 13.3132 19.2362 14.6136 18.7388 15.8268C18.2413 17.0401 17.5215 18.1425 16.6213 19.0607C15.7212 19.9789 14.6378 20.7142 13.4393 21.2239C12.2408 21.7335 10.9562 22 9.65625 22C8.3563 22 7.07174 21.7335 5.87326 21.2239C4.67478 20.7142 3.59136 19.9789 2.69121 19.0607C1.79107 18.1425 1.07132 17.0401 0.573853 15.8268C0.0763791 14.6136 -0.1875 13.3132 -0.1875 12C-0.1875 9.34784 0.852623 6.8043 2.69121 4.93934C4.52979 3.07437 7.02826 2 9.65625 2C12.2842 2 14.7827 3.07437 16.6213 4.93934C18.4599 6.8043 19.5 9.34784 19.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.5 2L12 12L9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-1 font-medium">Learning Paths</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements - Mobile responsive */}
            <div className="absolute left-[5%] md:left-[10%] top-[15%] animate-float-slow">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70 blur"></div>
                <div className="absolute inset-0.5 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-8 h-8 md:w-12 md:h-12 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute right-[8%] md:right-[15%] top-[20%] md:top-[25%] animate-float-medium">
              <div className="relative w-14 h-14 md:w-20 md:h-20">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 blur"></div>
                <div className="absolute inset-0.5 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 md:w-10 md:h-10 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V18C3 18.4142 3.33579 18.75 3.75 18.75H20.25C20.6642 18.75 21 18.4142 21 18V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 11.25L10.5 14.25L16.5 8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.15997 6.75V3.75C8.15997 3.55109 8.23902 3.36032 8.37967 3.21967C8.52032 3.07902 8.71107 3 8.90997 3H15.09C15.2889 3 15.4796 3.07902 15.6203 3.21967C15.7609 3.36032 15.84 3.55109 15.84 3.75V6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute left-[18%] md:left-[25%] bottom-[20%] md:bottom-[25%] animate-float-medium">
              <div className="relative w-20 h-20 md:w-32 md:h-32">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-70 blur"></div>
                <div className="absolute inset-0.5 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-16 md:h-16 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 4.5H6.75C5.50736 4.5 4.5 5.50736 4.5 6.75V17.25C4.5 18.4926 5.50736 19.5 6.75 19.5H17.25C18.4926 19.5 19.5 18.4926 19.5 17.25V6.75C19.5 5.50736 18.4926 4.5 17.25 4.5H16.5M7.5 4.5V3.75C7.5 2.50736 8.50736 1.5 9.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V4.5M7.5 4.5H16.5M9 12L11.25 14.25L15.75 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute right-[5%] md:right-[10%] bottom-[10%] md:bottom-[15%] animate-float-slow">
              <div className="relative w-18 h-18 md:w-28 md:h-28">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 opacity-70 blur"></div>
                <div className="absolute inset-0.5 rounded-xl bg-white dark:bg-gray-800 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-9 h-9 md:w-14 md:h-14 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.25 19.25H9.375C8.87772 19.25 8.40081 19.0525 8.04917 18.7008C7.69754 18.3492 7.5 17.8723 7.5 17.375V13.75H6.625C6.32663 13.75 6.04048 13.6315 5.8295 13.4205C5.61853 13.2095 5.5 12.9234 5.5 12.625V10.375C5.5 10.0766 5.61853 9.79048 5.8295 9.5795C6.04048 9.36853 6.32663 9.25 6.625 9.25H7.5V6.625C7.5 6.32663 7.61853 6.04048 7.8295 5.8295C8.04048 5.61853 8.32663 5.5 8.625 5.5H10.875C11.1734 5.5 11.4595 5.61853 11.6705 5.8295C11.8815 6.04048 12 6.32663 12 6.625V9.25H14.4588C14.6784 9.24992 14.8957 9.29616 15.0935 9.38518C15.2913 9.4742 15.4645 9.60355 15.6 9.7625L16.4963 10.8787C16.6455 11.0588 16.7463 11.2763 16.7889 11.5097C16.8315 11.7432 16.8146 11.9847 16.7398 12.2087C16.665 12.4328 16.5349 12.6312 16.3627 12.7851C16.1904 12.939 15.9817 13.0429 15.7575 13.0862L12.7538 13.75H11.25V19.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 7.5V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Responsive connecting lines */}
            <div className="hidden md:block absolute bottom-1/3 right-1/4 w-1/4 h-0.5 bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse-slow rounded-full"></div>

            {/* Mobile-only smaller connecting lines */}
            <div className="md:hidden absolute top-1/3 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-500/40 to-purple-500/40 animate-pulse-slow rounded-full"></div>
            <div className="md:hidden absolute bottom-1/3 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse-slow rounded-full"></div>
          </div>

          <div className="text-center mt-4 mb-6 md:mb-8 px-4">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">Select or Create a Learning Path</h3>
            <p className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 font-medium max-w-xl mx-auto">
              Explore AI-generated roadmaps that guide you through any tech skill
              with clear steps from beginner to expert.
            </p>
          </div>

        </div>
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