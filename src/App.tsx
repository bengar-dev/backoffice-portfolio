import { Route, Routes } from "react-router-dom";
import "./css/index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>tmlp</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
