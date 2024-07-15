import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '../store/atoms/auth';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const OAuth: React.FC = () => {
  const navigate = useNavigate();
  const setTokenState = useSetRecoilState(tokenState);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider().addScope("email");
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken();

      const response = await axios.post('/api/v1/user/google', {
        token,
        name: result.user.displayName,
        email: result.user.email,
      });

      setTokenState(response.data.token);
      localStorage.setItem("token", response.data.token || "");
      navigate("/app");
      toast.success("Welcome to StyleShare");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: { message: string } }>;

      if (axiosError?.response?.data?.error) {
        toast.error(axiosError.response.data.error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
     type="submit">
      Continue with Google
    </button>
  );
};

export default OAuth;
