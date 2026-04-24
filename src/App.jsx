import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import ExercisesPage from "./pages/ExercisesPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProgressPage from "./pages/ProgressPage";
import ForumPage from "./pages/ForumPage";
import ResourcesPage from "./pages/ResourcesPage";

export default function App() {
  let savedUser = null;

  if (localStorage.getItem("currentUser")) {
    savedUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  const [currentUser, setCurrentUser] = useState(savedUser);

  function handleLogin(user) {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <HashRouter>
      <NavigationBar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExercisesPage currentUser={currentUser} />} />
        <Route path="/bookmarked" element={<BookmarkedPage currentUser={currentUser} />} />
        <Route path="/progress" element={<ProgressPage currentUser={currentUser} />} />
        <Route path="/forum" element={<ForumPage currentUser={currentUser} />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
      </Routes>
    </HashRouter>
  );
}