import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import Policy from "./pages/Policy";
import GoTop from "./components/GoTop";
import { Toaster } from 'react-hot-toast';
import PageNotFound from "./pages/PageNotFound";
import Favorite from "./pages/Favorite";
import LeaderBoard from "./pages/LeaderBoard";
import CustomizeWithAi from "./pages/CustomizeWithAi";
import ScrollToTopWhenRouteChanges from "./components/ScrollToTopWhenRouteChanges";
import './i18n';
import LanguageDropdown from "./components/LanguageDropdown";
import TestimonialSlider from "./components/TestimonialSlider";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001/";

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense fallback={<Loader />}>
          <Navbar />
          <GoTop/>
          <ScrollToTopWhenRouteChanges/>
          <div className="min-h-[80vh] mt-12 pt-12">
            <LanguageDropdown/>
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
              <Route
                path="/app/fav"
                element={
                  <AuthenticatedRoute>
                    <Favorite />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/app/customize-with-ai/:id"
                element={
                  <AuthenticatedRoute>
                    <CustomizeWithAi />
                  </AuthenticatedRoute>
                }
              />
              <Route
               path="/app/leaderboard"
                element={
                    <LeaderBoard />
                }
              />
              <Route
                path="/app/contact-us"
                element={
                  <ContactUs />
                }
              />
              <Route
                path="/app/about"
                element={
                  <About />
                }
              />
              <Route
                path="/app/policy"
                element={
                  <Policy />
                }
              />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
          </div>
          <TestimonialSlider />
          <Footer />
        </React.Suspense>
      </RecoilRoot>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;