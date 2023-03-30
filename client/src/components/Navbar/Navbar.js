import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <Link
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            to="/"
          >
            {user.name}
          </Link>
          <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
            <i className="fas fa-plus mr-3"></i> New Report
          </button>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <Link
            className="flex items-center active-nav-link text-white py-4 pl-6 nav-item"
            to="/"
          >
            <i className="fas fa-home mr-3"></i>
            Ana Sayfa
          </Link>
          <Link
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
            to="/fleets"
          >
            <i className="fas fa-building mr-3"></i>
            Filolar
          </Link>
          {user.name === "admin" && (
            <>
              <Link
                className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                to="/customers"
              >
                <i className="fas fa-users mr-3"></i>
                Müşteriler
              </Link>
              <Link
                className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                to="/add-fleet"
              >
                <i className="fas fa-table mr-3"></i>
                Filo Ekle
              </Link>
              <Link
                className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
                to="/add-customer"
              >
                <i className="fas fa-user-plus mr-3"></i>
                Müşteri Ekle
              </Link>
            </>
          )}

          <a
            href="forms.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-align-left mr-3"></i>
            Forms
          </a>
          <a
            href="tabs.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
          >
            <i className="fas fa-calendar mr-3"></i>
            Calendar
          </a>
        </nav>
        <a
          href="/"
          className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
        >
          <i className="fas fa-car mr-3"></i>
          Araç Takip Sistemi
        </a>
      </aside>
    </div>
  );
}

export default Navbar;
