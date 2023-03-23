import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Admin/Home";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";

function App() {
  const user = useSelector((state) => state.users.user);

  return (
    <Router>
      <Routes>
        <Route path="/"element={user ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
