import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";

function AddFleet() {
  const { data, loading, error, reFetchUser } = useFetch(
    "/customer/getAllCustomers"
  );

  const [fleet, setFleet] = useState({
    fleetOwner: "",
    fleetName: "",
    fleetAddress: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFleet((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleAddFleet = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/fleet/addFleet", fleet);
      navigate("/fleets");
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
          {loading && <Loading></Loading>}

          {!loading && (
            <main className="w-full flex-grow p-6">
              <div className="flex flex-wrap">
                {/* Filo */}
                <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                  <p className="text-xl pb-6 flex items-center">
                    <i className="fas fa-truck mr-3"></i>Filo Bilgileri
                  </p>
                  <div className="leading-loose">
                    <form className="p-10 bg-white rounded shadow-xl">
                      <div>
                        <label
                          htmlFor="customers"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Bir seçenek seçin
                        </label>
                        <select
                          id="fleetOwner"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled selected>
                            Filo sahibini seçin
                          </option>
                          {data.map((item) => (
                            <option
                              value={item._id}
                              key={item._id}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm text-gray-600">
                          Filo Adı
                        </label>
                        <input
                          className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                          id="fleetName"
                          name="fleetName"
                          type="text"
                          required=""
                          onChange={handleChange}
                          placeholder="Filo Adı"
                          aria-label="Fleet Name"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm text-gray-600">
                          Adresi
                        </label>
                        <input
                          className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                          id="fleetAddress"
                          name="fleetAddress"
                          type="text"
                          required=""
                          onChange={handleChange}
                          placeholder="Adresi"
                          aria-label="Fleet Address"
                        />
                      </div>
                      <div className="mt-6">
                        <button
                          onClick={handleAddFleet}
                          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                          type="submit"
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          )}

        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddFleet;
