import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddCustomer from "./pages/Admin/Customers/AddCustomer";
import Customers from "./pages/Admin/Customers/Customers";
import EditCustomer from "./pages/Admin/Customers/EditCustomer";
import AddFleet from "./pages/Admin/Fleets/AddFleet";
import EditFleet from "./pages/Admin/Fleets/EditFleet";
import Fleets from "./pages/Admin/Fleets/Fleets";

import Home from "./pages/Admin/Home";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";

function App() {
  const user = useSelector((state) => state.users.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}></Route>
        <Route path="/add-customer" element={user.name === "admin" ? <AddCustomer /> : <Navigate to="/login" />}></Route>
        <Route path="/customers" element={user.name === "admin" ? <Customers /> : <Navigate to="/login" />}></Route>
        <Route path="/edit-customer/:id" element={user.name === "admin" ? <EditCustomer /> : <Navigate to="/login" />}></Route>
        <Route path="/add-fleet" element={user.name === "admin" ? <AddFleet /> : <Navigate to="/login" />}></Route>
        <Route path="/fleets" element={user ? <Fleets /> : <Navigate to="/login" />}></Route>
        <Route path="/edit-fleet/:id" element={user ? <EditFleet /> : <Navigate to="/login" />}></Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
