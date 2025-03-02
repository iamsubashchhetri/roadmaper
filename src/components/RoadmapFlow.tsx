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
  const { currentRoadmap, setSelectedTopic, setSelectedTopicForNotes } =
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
          setSelectedTopicForNotes(node.data.label);
        }
      }
    },
    [setSelectedTopic, setSelectedTopicForNotes, selectedTopic],
  );

  if (!currentRoadmap) {
    return (
    
        <div className="w-full max-w-4xl text-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-blue-100/50 dark:border-indigo-800/50">
          {/* Main title at the top center */}
          <div className="w-full text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x tracking-tight">
              Map your plans
            </h2>
            <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
          </div>

          {/* Community Section with Beautiful UI */}
          <div className="relative w-full max-w-4xl mx-auto mb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl blur-lg transform -rotate-1 scale-105"></div>
            
            <div className="relative z-10 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 md:p-8 border border-blue-100/80 dark:border-indigo-800/50 shadow-xl">
              
              {/* Logo and heading section */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-6 border-b border-indigo-100 dark:border-indigo-800/30">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 mr-4 shadow-md">
                    <svg className="w-8 h-8 md:w-9 md:h-9 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5V19.5M12 4.5C13.1935 4.5 14.3381 4.97411 15.182 5.81802C16.0259 6.66193 16.5 7.80653 16.5 9C16.5 10.1935 16.0259 11.3381 15.182 12.182C14.3381 13.0259 13.1935 13.5 12 13.5M12 4.5C10.8065 4.5 9.66193 4.97411 8.81802 5.81802C7.97411 6.66193 7.5 7.80653 7.5 9C7.5 10.1935 7.97411 11.3381 8.81802 12.182C9.66193 13.0259 10.8065 13.5 12 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 19.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 animate-gradient-x">Join the Community</h3>
                  </div>
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center md:text-right">
                  <p className="font-medium italic">roadmap.sh is the 7th most starred project on GitHub<br className="hidden md:block"/> and is visited by hundreds of thousands of developers every month.</p>
                </div>
              </div>
              
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {/* GitHub Stars Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/40 hover:shadow-lg transition-all duration-300 stat-card">
                  <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-blue-400/10 dark:bg-blue-400/20 z-0 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-indigo-400/10 dark:bg-indigo-400/20 z-0 group-hover:scale-150 transition-transform duration-500 delay-100"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-800/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">Rank 7th</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">out of 28M!</span>
                    </div>
                    
                    <div className="my-3">
                      <p className="text-3xl md:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 flex items-baseline">
                        309K
                        <svg className="w-5 h-5 ml-2 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">GitHub Stars</p>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group-hover:underline">
                        Star us on GitHub
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Help us reach #1</p>
                      <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-0.5">+90k every month</p>
                    </div>
                  </div>
                </div>
                
                {/* Registered Users Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-5 rounded-xl border border-purple-100 dark:border-purple-800/40 hover:shadow-lg transition-all duration-300 stat-card">
                  <div className="absolute -left-8 -top-8 w-20 h-20 rounded-full bg-purple-400/10 dark:bg-purple-400/20 z-0 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full bg-indigo-400/10 dark:bg-indigo-400/20 z-0 group-hover:scale-150 transition-transform duration-500 delay-100"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-3">
                      <span className="flex items-center justify-center w-max bg-purple-100 dark:bg-purple-800/70 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">Registered Users</span>
                    </div>
                    
                    <div className="my-3">
                      <p className="text-3xl md:text-4xl font-extrabold text-purple-600 dark:text-purple-400 flex items-baseline">
                        +1.5M
                        <svg className="w-5 h-5 ml-2 text-purple-500 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Developers</p>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors group-hover:underline">
                        Register yourself
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Commit to your growth</p>
                      <p className="text-xs text-purple-500 dark:text-purple-400 font-medium mt-0.5">+2k every month</p>
                    </div>
                  </div>
                </div>
                
                {/* Discord Members Card */}
                <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-5 rounded-xl border border-blue-100 dark:border-blue-800/40 hover:shadow-lg transition-all duration-300 stat-card">
                  <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-blue-400/10 dark:bg-blue-400/20 z-0 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-purple-400/10 dark:bg-purple-400/20 z-0 group-hover:scale-150 transition-transform duration-500 delay-100"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-3">
                      <span className="flex items-center justify-center w-max bg-blue-100 dark:bg-blue-800/70 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">Discord Members</span>
                    </div>
                    
                    <div className="my-3">
                      <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400 flex items-baseline">
                        34K
                        <svg className="w-5 h-5 ml-2 text-blue-500 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.2 19.2C15.8568 17.9068 14.0227 17.1666 12.12 17.1666C10.2173 17.1666 8.38324 17.9068 7.04 19.2M20.96 16.96L18.8 14.8M18.8 14.8V17.6M18.8 14.8H21.6M7.6 10.4C7.6 11.0365 7.34714 11.6469 6.89706 12.0971C6.44697 12.5471 5.83652 12.8 5.2 12.8C4.56348 12.8 3.95303 12.5471 3.50294 12.0971C3.05286 11.6469 2.8 11.0365 2.8 10.4C2.8 9.76347 3.05286 9.15302 3.50294 8.70294C3.95303 8.25285 4.56348 8 5.2 8C5.83652 8 6.44697 8.25285 6.89706 8.70294C7.34714 9.15302 7.6 9.76347 7.6 10.4ZM19.2 10.4C19.2 11.0365 18.9471 11.6469 18.4971 12.0971C18.047 12.5471 17.4365 12.8 16.8 12.8C16.1635 12.8 15.553 12.5471 15.1029 12.0971C14.6529 11.6469 14.4 11.0365 14.4 10.4C14.4 9.76347 14.6529 9.15302 15.1029 8.70294C15.553 8.25285 16.1635 8 16.8 8C17.4365 8 18.047 8.25285 18.4971 8.70294C18.9471 9.15302 19.2 9.76347 19.2 10.4ZM13.6 7.2C13.6 7.83652 13.3471 8.44696 12.8971 8.89706C12.447 9.34714 11.8365 9.6 11.2 9.6C10.5635 9.6 9.95303 9.34714 9.50294 8.89706C9.05286 8.44696 8.8 7.83652 8.8 7.2C8.8 6.56348 9.05286 5.95303 9.50294 5.50294C9.95303 5.05286 10.5635 4.8 11.2 4.8C11.8365 4.8 12.447 5.05286 12.8971 5.50294C13.3471 5.95303 13.6 6.56348 13.6 7.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Community Members</p>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:underline">
                        Join on Discord
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Join the community</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Light beam effect */}
              <div className="light-beam absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/10 dark:via-indigo-400/5 to-transparent -skew-x-45 pointer-events-none opacity-0"></div>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-80 overflow-hidden mb-10 md:mb-12">
            {/* Central design element */}
            <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
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
              Explore AI-generated roadmaps that guide you through any tech
              skill with clear steps from beginner to expert.
            </p>
          </div>

          {/* Community Statistics Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-100/50 dark:border-indigo-800/50 shadow-lg max-w-4xl mx-auto mt-10">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
                Join the Community
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                roadmap.sh is the 7th most starred project on GitHub and is visited by hundreds of thousands of developers every month.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* GitHub Stars */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/20 z-0"></div>
                <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Rank 7th</h4>
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full">out of 28M!</span>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400">309K</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">GitHub Stars</p>
                  </div>
                  
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group-hover:underline">
                      Star us on GitHub
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Help us reach #1</p>
                    <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">+90k every month</p>
                  </div>
                </div>
              </div>
              
              {/* Registered Users */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 p-5 rounded-xl border border-purple-100 dark:border-purple-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute -left-10 -top-10 w-24 h-24 rounded-full bg-purple-500/10 dark:bg-purple-500/20 z-0"></div>
                <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 z-0"></div>
                
                <div className="relative z-10">
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Registered Users</h4>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">+1.5M</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Developers</p>
                  </div>
                  
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors group-hover:underline">
                      Register yourself
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Commit to your growth</p>
                    <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">+2k every month</p>
                  </div>
                </div>
              </div>
              
              {/* Discord Members */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 p-5 rounded-xl border border-blue-100 dark:border-blue-800/50 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-blue-500/10 dark:bg-blue-500/20 z-0"></div>
                <div className="absolute -left-6 -bottom-6 w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-500/20 z-0"></div>
                
                <div className="relative z-10">
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Discord Members</h4>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400">34K</p>
                    <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Community Members</p>
                  </div>
                  
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group-hover:underline">
                      Join on Discord
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Join the community</p>
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
          defaultZoom={0.8}
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
              if (n.id === selectedTopic?.id) return '#6366F1';
              return '#555';
            }}
            nodeColor={(n) => {
              if (n.id === selectedTopic?.id) return '#818CF8';
              if (n.type === 'input') return '#C7EBDF';
              if (n.type === 'output') return '#E4D8FD';
              return '#fff';
            }}
            className="hidden md:block"
          />
        </ReactFlow>
      ) : null}
    </div>
  );
};

export default RoadmapFlow;