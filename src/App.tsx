import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import { useGetUserInfo } from "./hooks/useGetUserInfo";
import { About } from "./views/About";
import { Dashboard } from "./views/Dashboard";
import { Historic } from "./views/Historic";
import { SignIn } from "./views/SignIn";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { isSuccess } = useGetUserInfo();

  useEffect(() => {
    setIsAuth(isSuccess);
  }, [isSuccess]);

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/historic" element={<Historic />} />
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
