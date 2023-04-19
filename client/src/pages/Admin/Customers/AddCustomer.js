import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { toast, Toaster } from "react-hot-toast";

function AddCustomer() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      if (user.password === user.repassword) {
        await axios.post("/customer/addCustomer", user);
        navigate("/customers");
        //   localStorage.setItem("user", JSON.stringify(res.data));
        //   dispatch(login(res.data));
        // toast.success("Müşteri kaydedildi!");
      } else {
        toast.error("Şifreler eşleşmiyor !");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <main className="w-full flex-grow px-6">
            <div className="flex flex-wrap">
              {/* Customer */}
              <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                <p className="text-xl pb-6 flex items-center">
                  <i className="fas fa-address-card mr-3"></i> Müşteri Bilgileri
                </p>
                <div className="leading-loose">
                  <form className="p-10 bg-white rounded shadow-xl">
                    <div className="">
                      <label className="block text-sm text-gray-600">
                        Ad Soyad
                      </label>
                      <input
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="name"
                        name="name"
                        type="text"
                        required=""
                        onChange={handleChange}
                        placeholder="Ad Soyad"
                        aria-label="Name"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm text-gray-600">
                        E-mail
                      </label>
                      <input
                        className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                        id="email"
                        name="email"
                        type="text"
                        required=""
                        onChange={handleChange}
                        placeholder="E-mail"
                        aria-label="Email"
                      />
                    </div>
                    <div className="mt-2">
                      <label className=" block text-sm text-gray-600">
                        Telefon No
                      </label>
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                        id="phone"
                        name="phone"
                        type="text"
                        required=""
                        onChange={handleChange}
                        placeholder="Telefon No"
                        aria-label="Phone"
                      />
                    </div>
                    <div className="inline-block mt-2 w-1/2 pr-1">
                      <label className=" block text-sm text-gray-600">
                        Şifre
                      </label>
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                        id="password"
                        name="password"
                        type="text"
                        required=""
                        onChange={handleChange}
                        placeholder="Şifre"
                        aria-label="password"
                      />
                    </div>
                    <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                      <label className=" block text-sm text-gray-600">
                        Şifre Tekrar
                      </label>
                      <input
                        className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                        id="repassword"
                        name="repassword"
                        type="text"
                        required=""
                        onChange={handleChange}
                        placeholder="Şifre Tekrar"
                        aria-label="repassword"
                      />
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleAddCustomer}
                        className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                        type="submit"
                      >
                        Gönder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddCustomer;
