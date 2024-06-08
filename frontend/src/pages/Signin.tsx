import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";

declare global {
  interface Window {
    grecaptcha: ReCaptchaInstance;
  }
}

interface ReCaptchaInstance {
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
    message: "",
  });
  const setTokenState = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=6LeG1PMpAAAAAOo7ibaeooYAjVn8AwyqOj4P7bEV";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const recaptcha_token = await window.grecaptcha.execute('6LeG1PMpAAAAAOo7ibaeooYAjVn8AwyqOj4P7bEV', { action: 'submit' });
      const response = await axios.post("/api/v1/user/signin", {
        email,
        password,
        recaptcha_token,
      });

      setTokenState(response.data?.token);
      localStorage.setItem("token", response.data?.token || "");
      navigate("/app");
      toast.success("Login successfully");
    } catch (e) {
      const axiosError = e as AxiosError<{
        error: {
          message: string;
        };
      }>;
      if (axiosError?.response?.data?.error) {
        const errorMessage = axiosError.response.data.error.message;
        toast.error(errorMessage);
        setError({
          ...error,
          message: errorMessage,
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <section className=" flex justify-center p-12 md:bg-grey-500">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="max-w-md mx-auto mt-8 p-6  rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
              Sign In
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input text-white mt-1 p-2 block w-full rounded-lg bg-gray-700"
                  placeholder="john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-sm  font-semibold mb-2 text-red-600">
                  {error.email}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white relative">
                  Password
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input mt-1 p-2 block w-full text-white rounded-lg bg-gray-700"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer "
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>

                <p className="text-sm font-semibold mb-2 text-red-600">
                  {error.password}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className=" mt-4 text-md text-white">
              Don't have an account? -
              <Link to="/app/signup" className="text-blue-500 text-lg p-2">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
