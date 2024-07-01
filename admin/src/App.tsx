import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense fallback={<></>}>Admin Panel</React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
