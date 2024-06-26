import {GoogleAuthProvider,getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";
import toast from "react-hot-toast";
import { useState } from "react";
export default function OAuth() {
    const navigate = useNavigate();
    const setTokenState = useSetRecoilState(tokenState);
    const [error, setError] = useState({
        email: "",
        password: "",
        message: "",
      });

    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const response = await axios.post("/api/v1/user/google", {
                email:result.user.email,
                username:result.user.displayName,
              });
              setTokenState(response.data?.token);
            localStorage.setItem("token", response.data?.token || "");
            navigate('/app');
            toast.success('Login successfully')
        

        } catch (e) {
            const axiosError = e as AxiosError<{
              error: {
                message: string;
              };
            }>;
            const errorMessage = axiosError?.response?.data?.error?.message || "Invalid credentials. Please try again.";
            toast.error(errorMessage);
            setError({
              ...error,
              message: errorMessage,
            });
          }
    }
  return (
    <div >
        <button onClick={handleGoogleClick} className="flex justify-center items-center mt-2 py-2 px-4 w-full bg-white border border-gray-300 rounded-md shadow focus:ring-blue-500">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="Google logo" className="w-5 h-5 mr-2"/>
        <span className="flex justify-center items-center text-lg font-semibold text-gray-700  ">Continue with Google</span>
    </button>
    </div>
  )
}
