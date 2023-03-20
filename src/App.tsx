import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import { SignIn } from "./views/SignIn";

function App() {
  const isAuth = (): boolean => Boolean(localStorage.getItem("token"));

  return (
    <>
      {isAuth() ? (
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
