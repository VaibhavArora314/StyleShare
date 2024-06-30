import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminTokenState } from "../store/atoms/adminauth"; 
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import bgHero from "../../../frontend/src/assets/bgHero.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const [error, setError] = useState({
    email: "",
    password: "",
    message: "",
  });
  const setAdminTokenState = useSetRecoilState(adminTokenState);
  const navigate = useNavigate();

  document.title = 'Style Share | Admin Login page 👋';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/admin/login", {
        email,
        password,
      });

      setAdminTokenState(response.data?.token);
      localStorage.setItem("adminToken", response.data?.token || "");
      navigate('/app/admindashboard');
      toast.success('Admin login successfully');
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
    <div className="-mt-8 min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="flex justify-center p-12 md:bg-grey-500">
        <div className="w-full text-[#000435] bg-white dark:text-white dark:bg-[#000453] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-[#5f67de] dark:text-white text-center">
              {t("login.sigin")}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#5f67de] dark:text-white">
                  {t("login.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input text-[#000435] bg-white dark:text-white dark:bg-[#000453] border border-[#5f67de] dark:border-white mt-1 p-2 block w-full rounded-lg"
                  placeholder="john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-sm font-semibold mb-2 text-red-600">
                  {error.email}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-[#5f67de] dark:text-white relative">
                  {t("login.password")}
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input mt-1 p-2 block w-full text-[#000435] bg-white dark:text-white dark:bg-[#000453] rounded-lg border border-[#5f67de] dark:border-white"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  {t("login.sigin")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
