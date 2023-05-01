import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import useCarFetch from "../../../hooks/useCarFetch";

function AddFleet() {
  const { data, loading, error, reFetchUser } = useFetch(
    "/customer/getAllCustomers"
  );

  const { car, carLoading, carEror, reFetchCar } = useCarFetch();

  const [tempCar, setTempCar] = useState([]);

  const [fleet, setFleet] = useState({
    fleetOwner: "",
    fleetName: "",
    fleetAddress: "",
    fleetCars: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFleet((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleCarChange = (e) => {
    const carFind = car.filter((item) => item.id == e.target.value);
    setTempCar((prev) => [...prev, carFind[0]]);
  };

  const handleAddFleet = async (e) => {
    e.preventDefault();
    fleet.fleetCars = tempCar;
    try {
      const filtered = await data.filter(
        (item) => item._id === fleet.fleetOwner
      );
      const res = await axios.post("/fleet/addFleet", fleet);
      let mailUser = {
        email: filtered[0].email,
        name: filtered[0].name,
        route: res.data,
        type: "addFleet",
      };
      await axios.post("/mail/sendMail", mailUser);
      navigate("/fleets");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleCarDelete = async (id) => {
    const carFind = tempCar.filter((item) => item.id !== id);
    setTempCar(carFind);
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          {loading && <Loading></Loading>}

          {!loading && (
            <main className="w-full flex-grow p-4">
              <div className="flex flex-wrap">
                {/* Fleet */}
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
                          {data.map((item) =>
                            item.name !== "admin" &&
                            item.status === "active" ? (
                              <option value={item._id} key={item._id}>
                                {item.name}
                              </option>
                            ) : (
                              " "
                            )
                          )}
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
                {/* Vehicle */}

                <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                  <p className="text-xl pb-6 flex items-center">
                    <i className="fas fa-truck mr-3"></i>Araç Ekle
                  </p>
                  <div className="leading-loose">
                    <form className="p-10 bg-white rounded shadow-xl">
                      <div>
                        <label
                          htmlFor="customers"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Eklenecek araçları seçin
                        </label>
                        <select
                          id="tempCar"
                          onChange={handleCarChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled selected>
                            Araç seçin
                          </option>
                          {car.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.make} {"-"} {item.model} {"-"} {item.type}{" "}
                              {"-"} {item.year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div id="tasks" className="my-5">
                        {tempCar.map((item) => (
                          <div
                            id="task"
                            className="flex justify-between items-center border-b border-slate-200 py-3 px-2 bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                          >
                            <div className="inline-flex items-center space-x-2">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-slate-500 hover:text-blue-600"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                              <div>
                                {item.make} {"-"} {item.model} {"-"} {item.type}{" "}
                                {"-"} {item.year}
                              </div>
                            </div>
                            <div>
                              <svg
                                onClick={() => handleCarDelete(item.id)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 text-slate-500 hover:text-red-600 cursor-pointer"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 text-center">
                        ({tempCar.length}) araç seçildi.
                      </p>
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
