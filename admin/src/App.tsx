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
import UpdatePost from "./components/UpdatePost";
import Graphs from "./pages/Graphs";
import ContactMessages from "./pages/ContactMessages";
import Comments from "./pages/Comments";
import Layout from "./components/Layout";
import Favorites from "./pages/Favorites";
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
              path="/admin/*"
              element={
                <Layout>
                  <AuthenticatedRoute>
                    <Routes>
                      <Route path="" element={<Dashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="users" element={<Users />} />
                      <Route path="posts" element={<Posts />} />
                      <Route path="update-post/:postId" element={<UpdatePost />} />
                      <Route path="statistics" element={<Graphs />} />
                      <Route path="contactmessages" element={<ContactMessages />} />
                      <Route path="comments" element={<Comments />} />
                      <Route path="favorites" element={<Favorites />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </AuthenticatedRoute>
                </Layout>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
