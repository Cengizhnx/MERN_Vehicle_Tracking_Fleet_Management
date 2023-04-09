import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Header from "../../../components/Header/Header";
import { Toaster, toast } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import drivers from "../../../data/drivers.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddRoute() {
  const { data, loading, error, reFetchUser } = useFetch("/fleet/getAllFleets");

  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);

  const [fleet, setFleet] = useState();
  const [car, setCar] = useState();
  const [driver, setDriver] = useState();

  const [route, setRoute] = useState({
    starting: "",
    destination: "",
    customer_id: "",
    fleet_id: "",
    car_id: "",
    driver_id: "",
  });

  const handleChange = (e) => {
    setRoute((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleFleetChange = (e) => {
    const fleetFind = data.filter((item) => item._id == e.target.value);
    setFleet(fleetFind[0]);
  };

  const handleCarChange = (e) => {
    const carFind = fleet.fleetCars.filter((item) => item.id == e.target.value);
    setCar(carFind[0]);
  };

  const handleDriverChange = (e) => {
    const driverFind = drivers.filter((item) => item.id == e.target.value);
    setDriver(driverFind[0]);
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();

    route.customer_id = user._id;
    route.fleet_id = fleet._id;
    route.car_id = car.id;
    route.driver_id = driver.id;

    try {
      await axios.post("/route/addRoute", route);
      // toast.success("Rota oluşturuldu !");
      navigate("/routes");
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
                {/* Route */}
                <div className="w-full mt-6 pl-0 lg:pl-2">
                  <p className="text-xl flex items-center py-2">
                    <i className="fas fa-address-card mr-3"></i> Rota Bilgileri{" "}
                  </p>
                  <div className="w-full pl-0 lg:pl-2">
                    <div className="leading-loose">
                      <form className="p-10 bg-white h-64 rounded shadow-xl">
                        <div className="flex flex-row space-x-5">
                          <div>
                            <label className="block text-sm text-gray-600">
                              Hareket Noktası
                            </label>
                            <input
                              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                              id="starting"
                              name="starting"
                              type="text"
                              required=""
                              onChange={handleChange}
                              placeholder="Hareket Noktası"
                              aria-label="Starting"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-600">
                              Varış Noktası
                            </label>
                            <input
                              className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                              id="destination"
                              name="destination"
                              type="text"
                              required=""
                              onChange={handleChange}
                              placeholder="Varış Noktası"
                              aria-label="Destination"
                            />
                          </div>
                          <div>
                            <button
                              onClick={handleAddRoute}
                              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                              type="submit"
                            >
                              Kaydet
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-7">
                {/* Fleet */}
                <div className="w-full lg:w-1/3 mt-6 pl-0 lg:pl-2">
                  <p className="text-xl flex items-center py-2">
                    <i className="fas fa-address-card mr-3"></i> Filo Bilgileri{" "}
                  </p>
                  <div className="w-full pl-0 lg:pl-2">
                    <div className="leading-loose">
                      <form className="p-10 bg-white h-52 rounded shadow-xl">
                        <div>
                          <label
                            htmlFor="customers"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Bir filo seçin
                          </label>
                          <select
                            id="fleet"
                            onChange={handleFleetChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option disabled selected>
                              Filo seçin
                            </option>
                            {data.map(
                              (item) =>
                                item.fleetOwner === user._id && (
                                  <option
                                    value={item._id}
                                    key={item._id}
                                    // selected={item._id === fleet.fleetOwner}
                                  >
                                    {item.fleetName}
                                  </option>
                                )
                            )}
                          </select>
                        </div>
                        <div id="tasks" className="my-5">
                          {fleet && (
                            <p className="text-xs text-slate-500 my-5 text-center">
                              <span className="font-bold">
                                {fleet.fleetName}
                              </span>{" "}
                              isimli filo seçildi.
                            </p>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {fleet && (
                  <div className="w-full lg:w-1/3 pl-0 lg:pl-2">
                    <p className="text-xl flex items-center py-2">
                      <i className="fas fa-address-card mr-3"></i> Araç
                      Bilgileri{" "}
                    </p>
                    <div className="w-full lg:w-full mt-6 pl-0 lg:pl-2">
                      <div className="leading-loose">
                        <form className="p-10 bg-white h-52 rounded shadow-xl">
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
                              {fleet.fleetCars.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.make} {"-"} {item.model} {"-"}{" "}
                                  {item.type} {"-"} {item.year}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div id="tasks" className="my-5"></div>
                          {car && (
                            <p className="text-xs text-slate-500 text-center">
                              <span className="font-bold">
                                {car.make}
                                {"-"} {car.model}{" "}
                              </span>{" "}
                              isimli araç seçildi.
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {car && (
                  <div className="w-full lg:w-1/3 pl-0 lg:pl-2">
                    <p className="text-xl flex items-center py-2">
                      <i className="fas fa-address-card mr-3"></i> Şöfor
                      Bilgileri{" "}
                    </p>
                    <div className="w-full lg:w-full mt-6 pl-0 lg:pl-2">
                      <div className="leading-loose">
                        <form className="p-10 bg-white h-52 rounded shadow-xl">
                          <div>
                            <label
                              htmlFor="customers"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Eklenecek araçları seçin
                            </label>
                            <select
                              id="driver"
                              onChange={handleDriverChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option disabled selected>
                                Şöfor seçin
                              </option>
                              {drivers.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.first_name} {item.last_name} {"||"}{" "}
                                  {item.phone}{" "}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div id="tasks" className="my-5">
                            {driver && (
                              <p className="text-xs text-slate-500 text-center">
                                <span className="font-bold">
                                  {driver.first_name} {driver.last_name}
                                </span>{" "}
                                isimli şöfor seçildi.
                              </p>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default AddRoute;
