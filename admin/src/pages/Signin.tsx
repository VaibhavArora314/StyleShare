import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import bgHero from "../assets/bgHero.png";
import CaptchaAdmin from "../components/CaptchaAdmin";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    message: "",
  });
  const setTokenState = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  document.title='Style Share Admin | Login page 👋'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      toast.error('Captcha is not valid');
      return;
    }

    try {
      const response = await axios.post("/api/v1/admin/login", {
        email,
        password,
      });

      setTokenState(response.data?.token);
      localStorage.setItem("authToken", response.data?.token || "");
      navigate('/admin');
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
  };

  return (
    <div className="h-screen text-[#000435] bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <section className=" flex pt-40 justify-center p-12 md:bg-grey-500">
      <div className="bg-[#000453] w-full border-2 border-sky-500  text-[#000435] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
      <div className="max-w-md mx-auto mt-8 p-6  rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-[#5f67de] text-center">
        Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 font-semibold ">
            <label htmlFor="email" className="block text-[#5f67de] ">
            Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input text-[#000435] bg-white border border-[#5f67de] mt-1 p-2 block w-full rounded-lg  "
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-sm  font-semibold mb-2 text-red-600">
              {error.email}
            </p>
          </div>
          <div className="mb-4 font-semibold">
            <label htmlFor="password" className="block text-[#5f67de] relative">
            Password
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input mt-1 p-2 block w-full text-[#000435] bg-white rounded-lg border border-[#5f67de]"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
              <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] cursor-pointer ">
              {showPassword ? (
                  <AiOutlineEyeInvisible
                      fontSize={24}
                      fill="#AFB2BF"
                  />
              ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
              </span>
            </label>              
            <p className="text-sm font-semibold mb-2 text-red-600">
              {error.password}
            </p>
          </div>
          <CaptchaAdmin onChange={(isValid) => setIsCaptchaValid(isValid)} />
          <div className="flex justify-center">
          <button
            type="submit"
            className="font-semibold bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          </div>
        </form>
      </div>
      </div>
      </section>
    </div>
  );
};

export default Signin;