import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import RoadmapFlow from "./components/RoadmapFlow";
import Toolbar from "./components/Toolbar";
import TopicDetail from "./components/TopicDetail";
import RoadmapSelector from "./components/RoadmapSelector";
import { useRoadmapStore } from "./store/roadmapStore";
import Footer from "./components/Footer";
import { AuthProvider } from "./store/authContext";
import { useAuth } from "./store/authContext";
import SignIn from "./components/Auth/SignIn";
import Profile from "./components/Auth/Profile";
import RequireAuth from "./components/Auth/RequireAuth";
import SaveRoadmapButton from "./components/SaveRoadmapButton";
import NotesApp from "./components/Notes/NotesApp";
import { UserIcon } from "lucide-react";

// Home page component
const Home = () => {
  const { isDarkMode, currentRoadmap } = useRoadmapStore();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load user data when they're logged in
    if (currentUser) {
      const roadmapStore = useRoadmapStore.getState();
      roadmapStore.loadUserRoadmaps(currentUser.uid);
      roadmapStore.loadSearchHistory(currentUser.uid);
    }
  }, [currentUser]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <RoadmapSelector />

      {currentRoadmap && currentUser && (
        <div className="flex justify-end mb-4">
          <SaveRoadmapButton roadmapId={currentRoadmap.id} />
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="w-full">
          <RoadmapFlow />
        </div>
        <div className="w-full">
          <TopicDetail />
        </div>
      </div>
    </div>
  );
};

function App() {
  const { isDarkMode } = useRoadmapStore();

  return (
    <AuthProvider>
      <div className={`app min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-800 p-3 sm:p-4 md:p-8 bg-pattern">
          <Router>
            <header className="w-full max-w-7xl mx-auto mb-6 flex justify-between items-center">
              <Link
                to="/"
                className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                Roadmap Generator
              </Link>

              <nav className="flex gap-2 sm:gap-3">
                <Link
                  to="/notes"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow transition-all text-sm sm:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <span>Notes</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow transition-all text-sm sm:text-base"
                >
                  <UserIcon size={16} />
                  <span>Account</span>
                </Link>
              </nav>
            </header>

            <main className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/notes/*"
                  element={
                    <RequireAuth>
                      <NotesApp />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>

            <Footer />
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
