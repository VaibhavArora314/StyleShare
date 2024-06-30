import { BrowserRouter } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { userState } from "./store/atoms/auth"

function App() {
  const user = useRecoilValue(userState);
  console.log(user);

  return (
    <BrowserRouter>
      Admin Panel
    </BrowserRouter>
  )
}

export default App
