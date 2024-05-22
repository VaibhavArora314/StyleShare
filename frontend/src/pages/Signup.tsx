import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your sign up logic here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">Sign Up</h2>
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
