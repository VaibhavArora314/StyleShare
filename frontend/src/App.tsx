import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import { RecoilRoot } from "recoil";
import NonAuthenticatedRoute from "./components/NonAuthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Profile from "./pages/Profile";
import React from "react";
import Loader from "./components/Loader";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense fallback={<Loader/>}>
          <Navbar />

          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/app" element={<Home />} />
              <Route path="/app/posts/:id" element={<Post />} />
              <Route path="/app/posts" element={<Posts />} />
              <Route
                path="/app/signin"
                element={
                  <NonAuthenticatedRoute>
                    <Signin />
                  </NonAuthenticatedRoute>
                }
              />
              <Route
                path="/app/signup"
                element={
                  <NonAuthenticatedRoute>
                    <Signup />
                  </NonAuthenticatedRoute>
                }
              />
              <Route
                path="/app/new-post"
                element={
                  <AuthenticatedRoute>
                    <NewPost />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/app/profile"
                element={
                  <AuthenticatedRoute>
                    <Profile />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/app" />} />
            </Routes>
          </div>

          <Footer />
        </React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
