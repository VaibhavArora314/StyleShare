import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import OAuth from "../components/OAuth";
import bgHero from "../assets/bgHero.png";
import CaptchaUser from "../components/CaptchaUser";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<ZXCVBNResult | null>(
    null
  );
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    message: "",
  });
  const { t } = useTranslation();
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword));
  };

  const strengthMeterColor = (score: number) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-yellow-300";
      case 3:
        return "bg-green-300";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      toast.error('Captcha is not valid');
      return;
    }

    try {
      const response = await axios.post("/api/v1/user/signup", {
        username,
        email,
        password,
      });
      console.log(response);
      setTokenState(response.data?.token);
      localStorage.setItem("token", response.data?.token || "");
      navigate("/app");
      toast.success("Signup successfull")
    } catch (e) {
      const axiosError = e as AxiosError<{
        error: {
          message: string;
        };
      }>;

      setError((e) => {
        if (axiosError?.response?.data?.error)
          return axiosError?.response?.data?.error as typeof e;

        toast.error("An unexpected error occurred");
        return e;
      });
    }
  };

    document.title='Style Share | Register page 👋'

  return (
    <div className="-mt-8 min-h-screen  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <section className="flex justify-center p-10 md:bg-grey-500">
        <div className="w-full text-[#000435] bg-white dark:text-white dark:bg-[#000453] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-4 text-[#5f67de] dark:text-white text-center">
            {t("register.signup")}
            </h2>
            <p className="text-lg font-semibold mb-2 text-red-600 text-center">
              {error.message}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-[#5f67de] dark:text-white">
                {t("register.username")}
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input mt-1 p-2 block w-full rounded-lg text-[#000435] bg-white dark:text-white dark:bg-[#000453] border border-[#5f67de] dark:border-white"
                  value={username}
                  placeholder="John Doe"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <p className="text-sm font-semibold mb-2 text-red-600">
                {error.username}
              </p>
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#5f67de] dark:text-white">
                {t("login.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input mt-1 p-2 block w-full rounded-lg text-[#000435] bg-white dark:text-white dark:bg-[#000453] border border-[#5f67de] dark:border-white"
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
                <label
                  htmlFor="password"
                  className="block text-[#5f67de] dark:text-white relative"
                >
                  {t("login.password")}
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input mt-1 p-2 block w-full rounded-lg text-[#000435] bg-white dark:text-white dark:bg-[#000453] border border-[#5f67de] dark:border-white"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                </label>
                {passwordStrength && (
                  <div className="mt-2">
                    <div className="w-full text-[#5f67de] dark:text-white rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className={`h-2.5 rounded-full ${strengthMeterColor(
                          passwordStrength.score
                        )}`}
                        style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-[#5f67de] dark:text-white text-sm">
                      {
                        ["Weak", "Fair", "Good", "Strong", "Very Strong"][
                          passwordStrength.score
                        ]
                      }
                    </p>
                  </div>
                )}
                <ul className="list-none text-[#5f67de] dark:text-white text-sm mt-2">
                  <li className="text-sm">
                    <span className="low-upper-case">
                      <FontAwesomeIcon
                        icon={
                          /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password)
                            ? faCheck
                            : faCircle
                        }
                        className={
                          /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      &nbsp;Lowercase & Uppercase
                    </span>
                  </li>
                  <li className="text-sm">
                    <span className="one-number">
                      <FontAwesomeIcon
                        icon={/([0-9])/.test(password) ? faCheck : faCircle}
                        className={
                          /([0-9])/.test(password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      &nbsp;Number (0-9)
                    </span>
                  </li>
                  <li className="text-sm">
                    <span className="one-special-char">
                      <FontAwesomeIcon
                        icon={
                          /([!,%,&,@,#,$,^,*,?,_,~])/.test(password)
                            ? faCheck
                            : faCircle
                        }
                        className={
                          /([!,%,&,@,#,$,^,*,?,_,~])/.test(password)
                            ? "text-green-600"
                            : "text-gray-400"
                        }
                      />
                      &nbsp;Special Character (!@#$%^&*)
                    </span>
                  </li>
                  <li className="text-sm">
                    <span className="eight-character">
                      <FontAwesomeIcon
                        icon={password.length > 7 ? faCheck : faCircle}
                        className={
                          password.length > 7 ? "text-green-600" : "text-gray-400"
                        }
                      />
                      &nbsp;At least 8 Characters
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-sm font-semibold mb-2 text-red-600">
                {error.password}
              </p>
              <CaptchaUser onChange={(isValid) => setIsCaptchaValid(isValid)} />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                >
                  {t("register.signup")}
                </button>
                <OAuth/>
              </div>
            </form>
            <p className="mt-4 text-sm text-[#000435] bg-white dark:text-white dark:bg-[#000453]">
            {t("register.alAccount")}{" "}
              <Link to="/app/signin" className="text-blue-500 ">
              {t("login.sigin")}
              </Link>
            </p>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;