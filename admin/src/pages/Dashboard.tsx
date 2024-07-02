import { useRecoilValue, useSetRecoilState } from "recoil"
import { tokenState, userState } from "../store/atoms/auth"

const Dashboard = () => {
  const setTokenState = useSetRecoilState(tokenState);
  const user = useRecoilValue(userState);

  const handleLogout = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
  }

  return (
    <div className="flex flex-col items-start">
      <h1>Dashboard</h1>

      <p>Email: {user?.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard