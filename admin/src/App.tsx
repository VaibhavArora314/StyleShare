import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import NonAuthenticatedRoute from "./components/NonAuthenticatedRoute";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense fallback={<></>}>
          Admin Panel
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
