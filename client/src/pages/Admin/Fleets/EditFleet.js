import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useSelector } from "react-redux";

function EditFleet() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `/fleet/getFleet/${id}`
  );

  const customers = useSelector((state) => state.customers.customer);

  useEffect(() => {
    setFleet(data);
  }, [data]);

  const [fleet, setFleet] = useState({
    fleetOwner: "",
    fleetName: "",
    fleetAddress: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFleet((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEditFleet = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/fleet/updateFleet/${id}`, fleet);
      // navigate("/fleet");
      //   localStorage.setItem("user", JSON.stringify(res.data));
      //   dispatch(login(res.data));
      toast.success("Güncelleme Başarılı!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>

        {loading && <Loading></Loading>}

        {!loading && (
          <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
              <div className="flex flex-wrap">
                {/* Fleet */}
                <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                  <p className="text-xl pb-6 flex items-center">
                    <i className="fas fa-address-card mr-3"></i> Filo Bilgileri{" "}
                    {fleet.status === "active" ? (
                      <span className="bg-blue-200 text-blue-600 ml-4 py-2 px-4 rounded-full text-sm">
                        Aktif
                      </span>
                    ) : (
                      <span class="bg-red-200 text-red-600 ml-4 py-2 px-4 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                  </p>
                  <div className="w-full lg:w-2/3 mt-6 pl-0 lg:pl-2">
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
                            {customers.map((item) => (
                              <option
                                value={item._id}
                                key={item._id}
                                selected={item._id === fleet.fleetOwner}
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
                            value={fleet.fleetName}
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
                            value={fleet.fleetAddress}
                            onChange={handleChange}
                            placeholder="Adresi"
                            aria-label="Fleet Address"
                          />
                        </div>
                        <div className="mt-6">
                          <button
                            onClick={handleEditFleet}
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
              </div>
            </main>
            <Footer></Footer>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default EditFleet;
