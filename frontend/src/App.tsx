import { useEffect } from "react";
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

function App() {
  useEffect(() => {
    const getResponse = async () => {
      const response = await fetch("/");

      console.log(response);
      console.log(await response.json());
    };

    getResponse();
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="/app/signin" element={<Signin />} />
          <Route path="/app/signup" element={<Signup />} />
          <Route path="/app/new-post" element={<NewPost />} />
          <Route path="/app/posts" element={<Posts />} />
          <Route path="/app/posts/:id" element={<Post />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
