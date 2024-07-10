import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NonAuthenticatedRoute from "./components/NonAuthenticatedRoute";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import { Toaster } from "react-hot-toast";
import Graphs from "./pages/Graphs";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense fallback={<></>}>
          <Routes>
            <Route
              path="/admin/sign-in"
              element={
                <NonAuthenticatedRoute>
                  <Signin />
                </NonAuthenticatedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AuthenticatedRoute>
                  <Users />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <AuthenticatedRoute>
                  <Posts />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <AuthenticatedRoute>
                  <Graphs />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster/>
        </React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
