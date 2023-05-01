import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

function Header() {
  const [open, setOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
        <div className="w-1/2"></div>
        <div
          // x-data="{ isOpen: false }"
          className="relative w-1/2 flex justify-end"
        >
          <button
            onClick={(prev) => setOpen((prevState) => !prevState)}
            className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
          </button>
          {/* <button
            x-show="isOpen"
            // onClick="isOpen = false"
            className="h-full w-full fixed inset-0 cursor-default"
          ></button> */}
          <div
            x-show="isOpen"
            className={`absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 ${
              open ? "block" : "hidden"
            }`}
          >
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Support
            </a>
            <p
              onClick={handleLogout}
              className="cursor-pointer block px-4 py-2 account-link hover:text-white"
            >
              Sign Out
            </p>
          </div>
        </div>
      </header>

      <header
        // x-data="{ isOpen: false }"
        className="w-full bg-sidebar py-5 px-6 sm:hidden"
      >
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button
            onClick={(prev) => setOpenNav((prevState) => !prevState)}
            // onClick="isOpen = !isOpen"
            className="text-white text-3xl focus:outline-none"
          >
            {!openNav ? (
              <i className="fas fa-bars"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </button>
        </div>

        <nav className={`flex flex-col pt-4 ${openNav ? "block" : "hidden"}`}>
          <Link
            className={`flex items-center text-white py-2 pl-4 nav-item ${
              window.location.pathname === "/" && "active-nav-link opacity-100"
            }`}
            to="/"
          >
            <i className="fas fa-home mr-3"></i>
            Ana Sayfa
          </Link>

          {user.name === "admin" && (
            <>
              <Link
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item ${
                  window.location.pathname === "/add-customer" &&
                  "active-nav-link opacity-100"
                }`}
                to="/add-customer"
              >
                <i className="fas fa-user-plus mr-3"></i>
                Müşteri Ekle
              </Link>
              <Link
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item ${
                  window.location.pathname === "/customers" &&
                  "active-nav-link opacity-100"
                }`}
                to="/customers"
              >
                <i className="fas fa-users mr-3"></i>
                Müşteriler
              </Link>
              <Link
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item ${
                  window.location.pathname === "/add-fleet" &&
                  "active-nav-link opacity-100"
                }`}
                to="/add-fleet"
              >
                <i className="fas fa-table mr-3"></i>
                Filo Ekle
              </Link>
            </>
          )}

          <Link
            className={`flex items-center text-white py-2 pl-4 nav-item ${
              window.location.pathname === "/fleets" &&
              "active-nav-link opacity-100"
            }`}
            to="/fleets"
          >
            <i className="fas fa-building mr-3"></i>
            Filolar
          </Link>

          {user.name !== "admin" && (
            <Link
              className={`flex items-center text-white py-2 pl-4 nav-item ${
                window.location.pathname === "/add-route" &&
                "active-nav-link opacity-100"
              }`}
              to="/add-route"
            >
              <i className="fas fa-route mr-3"></i>
              Rota Ekle
            </Link>
          )}

          <Link
            className={`flex items-center text-white py-2 pl-4 nav-item ${
              window.location.pathname === "/routes" &&
              "active-nav-link opacity-100"
            }`}
            to="/routes"
          >
            <i className="fas fa-road mr-3"></i>
            Rotalar
          </Link>

          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </a>
          {/* <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
          </button> */}
        </nav>
        {/* <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <i className="fas fa-plus mr-3"></i> New Report
        </button> */}
      </header>
    </div>
  );
}

export default Header;
