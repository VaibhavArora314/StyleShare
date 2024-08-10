import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import NonAuthenticatedRoute from "./components/NonAuthenticatedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Profile from "./pages/Profile";
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
import ShowProfile from "./pages/ShowProfile";
import { Tooltip } from 'react-tooltip';
import EditPost from "./pages/EditPost";
import useTheme from './hooks/useTheme';
import CodeEditor from "./pages/CodeEditor";
import Contributors from "./pages/Contributors";
import userBlock from "./hooks/userBlock";
import Blocked from "./pages/Blocked";
import GoogleTranslate from "./components/GoogleTranslate";
import ProgressScrollDown from "./components/ProgressScrollDown";
import Preloader from "./components/PreLoader"; 
import "./App.css"
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const { theme, toggleTheme } = useTheme();
  const { loading, isBlocked } = userBlock(5);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader/>;
  }

  if (isBlocked) {
    return <Blocked />;
  }

  return (
    <>
      {isPreloaderVisible && <Preloader />}
      {!isPreloaderVisible && (
        <BrowserRouter>
          <React.Suspense>
            <GoTop />
            <ProgressScrollDown />
            <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#000435', color: theme === 'light' ? '#000435' : '#fff'}}>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <ScrollToTopWhenRouteChanges />
              <div className="min-h-[80vh] pt-20">
                <div className="ml-2 fixed z-40">
                  <GoogleTranslate/>
                </div>
                <Routes>
                  <Route path="/app" element={<Home />} />
                  <Route path="/app/posts/:id" element={<Post />} />
                  <Route path="/app/posts" element={<Posts />} />
                  <Route path="/app/contributors" element={<Contributors />} />
                  <Route path="/app/profile/:id" element={<ShowProfile />} />
                  <Route
                    path="/app/signin"
                    element={
                      <NonAuthenticatedRoute>
                        <LoginForm defaultFormType="Signin" />
                      </NonAuthenticatedRoute>
                    }
                  />
                  <Route
                    path="/app/signup"
                    element={
                      <NonAuthenticatedRoute>
                        <LoginForm defaultFormType="SignUp" />
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
                    path="/app/posts/edit/:id"
                    element={
                      <AuthenticatedRoute>
                        <EditPost />
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
                    path="/app/code"
                    element={
                      <AuthenticatedRoute>
                        <CodeEditor />
                      </AuthenticatedRoute>
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
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </React.Suspense>
          <Tooltip id="my-tooltip" place='right' style={{backgroundColor:"#00AAFF",color:'#fff',fontSize:'15px'}} />
          <Toaster />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
