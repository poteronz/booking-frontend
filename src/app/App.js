import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useUserStore } from "./store";
import { Header } from "../widgets/Header";
import { LoginForm } from "../features/auth";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";

// внутренний компонент с навигацией
function AppContent() {
  var currentUser = useUserStore(function (state) { return state.currentUser; });
  var setUser = useUserStore(function (state) { return state.setUser; });
  var logout = useUserStore(function (state) { return state.logout; });
  var navigate = useNavigate();

  // определяем текущую страницу для подсветки в шапке
  var path = window.location.pathname;
  var currentPage = "home";
  if (path.indexOf("profile") !== -1) {
    currentPage = "profile";
  }

  // если не залогинен - показываем форму входа
  if (currentUser === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">BookIt</h1>
          <LoginForm onLogin={function (user) { setUser(user); }} />
        </div>
      </div>
    );
  }

  // навигация между страницами
  function handleNavigate(page) {
    if (page === "home") {
      navigate("/");
    }
    if (page === "profile") {
      navigate("/profile");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        user={currentUser}
        page={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<HomePage userId={currentUser.id} />} />
        <Route path="/profile" element={<ProfilePage userId={currentUser.id} />} />
      </Routes>
    </div>
  );
}

// главный компонент с роутером
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
