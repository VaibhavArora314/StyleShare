import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({
		username: "",
		email: "",
		password: "",
		message: "",
	});
	const [userId, setUserId] = useState<string | null>(null);
	const [otpStr, setOtpStr] = useState<string>(""); // to store otp string
	const [otpSent, setOtpSent] = useState<boolean>(false); // to store otp sent status


	const setTokenState = useSetRecoilState(tokenState);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/v1/user/signup", {
				username,
				email,
				password,
			});

			console.log(response);
			setTokenState(response.data?.token);
			setUserId(response.data?.user?.id);  // to send while verifying otp
			localStorage.setItem("token", response.data?.token || "");
			// navigate('/app');
		} catch (e) {
			const axiosError = e as AxiosError<{
				error: {
					message: string;
				};
			}>;
			// console.log(e);
			setError((e) => {
				if (axiosError?.response?.data?.error)
					return axiosError?.response?.data?.error as typeof e;

				e.message = "An unexpected error occurred";
				return e;
			});
		}

		// try{
		// 	const response = await axios.post("/api/v1/user/verify", {
		// 		userId,
		// 		otp: parseInt(otpStr),
		// 	})
		// 	console.log(response);
		// 	navigate('/app');
		// }catch(e){
		// 	const axiosError = e as AxiosError<{
		// 		error: {
		// 			message: string;
		// 		};
		// 	}>;
		// 	// console.log(e);
		// 	setError((e) => {
		// 		if (axiosError?.response?.data?.error)
		// 			return axiosError?.response?.data?.error as typeof e;

		// 		e.message = "An unexpected error occurred";
		// 		return e;
		// 	});
		// }

	};

	const handleOtpSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/v1/user/verify", {
				userId,
				otp: parseInt(otpStr),
			})
			console.log(response);
			navigate('/app');
		} catch (e) {
			const axiosError = e as AxiosError<{
				error: {
					message: string;
				};
			}>;
			// console.log(e);
			setError((e) => {
				if (axiosError?.response?.data?.error)
					return axiosError?.response?.data?.error as typeof e;

				e.message = "An unexpected error occurred";
				return e;
			});
		}
	}

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">
        Sign Up
      </h2>
      <p className="text-lg font-semibold mb-2 text-red-600 text-center">
        {error.message}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-200">
            Username
          </label>

          <input
            type="text"
            id="username"
            className="form-input mt-1 p-2 block w-full rounded-lg bg-gray-700"
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
          <label htmlFor="email" className="block text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input mt-1 p-2 block w-full rounded-lg bg-gray-700"
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
          <label htmlFor="password" className="block text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input mt-1 p-2 block w-full rounded-lg bg-gray-700"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="text-sm font-semibold mb-2 text-red-600">
          {error.password}
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-white">
        Already have an account?{" "}
        <Link to="/app/signin" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
