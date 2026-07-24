import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import DashboardLayout from "../components/dashboard/layout/DashboardLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/dashboard/Projects";
import ProjectDetails from "../pages/dashboard/ProjectDetails";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Landing */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* Auth */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Dashboard */}

      

        <Route element={<DashboardLayout />}>

    <Route
        path="/dashboard"
        element={<Dashboard />}
    />

    <Route
        path="/dashboard/projects"
        element={<Projects />}
    />

    <Route
        path="/dashboard/projects/:projectId"
        element={<ProjectDetails />}
    />

    <Route
        path="/dashboard/projects/:projectId/campaigns"
        element={<ProjectDetails />}
    />

    <Route
        path="/dashboard/projects/:projectId/analytics"
        element={<ProjectDetails />}
    />

</Route>

      
      

    </Routes>
  );
};

export default AppRoutes;