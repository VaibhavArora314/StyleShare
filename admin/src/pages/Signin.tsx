import axios from "axios";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../store/atoms/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const setTokenState = useSetRecoilState(tokenState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/admin/login", {
        email,
        password,
      });

      console.log(response);

      localStorage.setItem("authToken",response.data?.token);
      setTokenState(response.data?.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center">
      Signin
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col"
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="password"
        />

        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
};

export default Signin;
