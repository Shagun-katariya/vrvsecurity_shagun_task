import React, { useState, useCallback, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar.jsx";
import Loader from "./components/loader/Loader.jsx";

// Lazy load components
const UserList = React.lazy(() => import("./components/user/UserList.jsx"));
const UserForm = React.lazy(() => import("./components/user/UserForm.jsx"));
const RoleForm = React.lazy(() => import("./components/role/RoleForm.jsx"));
const RoleList = React.lazy(() => import("./components/role/RoleList.jsx"));

const App = () => {
  const [activeLink, setActiveLink] = useState("/users");

  const handleClick = useCallback((path) => {
    setActiveLink(path);
  }, []); // Memoizing handleClick to prevent unnecessary renders

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="App">
        <Navbar activeLink={activeLink} handleClick={handleClick} />

        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/roles" element={<RoleList />} />
            <Route path="/roles/create" element={<RoleForm />} />
            <Route path="/roles/edit/:id" element={<RoleForm />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
