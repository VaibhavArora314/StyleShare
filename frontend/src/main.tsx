import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RecoilRoot } from "recoil";
import './index.css'
// import PreLoader from './components/Loader/Loader';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <PreLoader /> */}
  <RecoilRoot>
    
    <App />
  </RecoilRoot>
  </React.StrictMode>,
)
