import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import drivers from "../../../data/drivers.json";
import useCarFetch from "../../../hooks/useCarFetch";
import { visibilityChange } from "../../../redux/modalSlice";
import { addRoute } from "../../../redux/routeSlice";
import Modal from "../../../components/Modal/Modal";

function Table({ routes, reFetchUser }) {
  const { data, loading, error } = useFetch(`/fleet/getAllFleets`);
  const { car, carLoading, carEror, reFetchCar } = useCarFetch();

  const user = useSelector((state) => state.users.user);

  const modal = useSelector((state) => state.modals.modal);

  const dispatch = useDispatch();

  const filtered = data.filter((item) => item.fleetOwner === user._id);

  const handleDetailRoute = (route) => {
    dispatch(addRoute(route));
    dispatch(visibilityChange(true));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center font-sans overflow-auto">
      {loading && carLoading && <Loading></Loading>}
      {!loading && !carLoading && (
        <div className="w-full">
          {modal && <Modal car={car}></Modal>}
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-4 px-8 text-center">Hareket Noktası</th>
                  <th className="py-4 px-8 text-center">Varış Noktası</th>
                  <th className="py-4 px-8 text-center">Araç</th>
                  <th className="py-4 px-8 text-center">Şöfor</th>
                  <th className="py-4 px-8 text-center">Durum</th>
                  <th className="py-4 px-8 text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {routes.map((item) =>
                  user.name !== "admin" ? (
                    filtered.map(
                      (i) =>
                        item.fleet_id === i._id && (
                          <tr
                            key={item._id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="py-4 px-8 text-center">
                              <span>{item.starting}</span>
                            </td>
                            <td className="py-4 px-8 text-center">
                              <span>{item.destination}</span>
                            </td>
                            <td className="py-4 px-8 text-center">
                              {car.map(
                                (cars) =>
                                  cars.id === item.car_id && (
                                    <span key={cars.id}>
                                      {cars.make} {"-"} {cars.model}
                                    </span>
                                  )
                              )}
                            </td>
                            <td className="py-4 px-8 text-center">
                              {drivers.map(
                                (driver) =>
                                  driver.id === item.driver_id && (
                                    <span key={driver.id}>
                                      {driver.first_name} {driver.last_name}
                                    </span>
                                  )
                              )}
                            </td>
                            <td className="py-4 px-8 text-center">
                              {item.status === "active" ? (
                                <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-sm">
                                  Aktif
                                </span>
                              ) : (
                                <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-sm">
                                  Pasif
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-8 text-center">
                              <div className="flex item-center justify-center">
                                <Link
                                  onClick={() => handleDetailRoute(item)}
                                  className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor:pointer"
                                >
                                  <i class="fas fa-info-circle"></i>
                                </Link>
                                <Link
                                  to={`/edit-fleet/${item._id}`}
                                  className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                                >
                                  <i className="fas fa-pen"></i>
                                </Link>
                                <Link
                                  // onClick={() => handleDeleteFleet(item)}
                                  className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr
                      key={item._id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-4 px-8 text-center">
                        <span>{item.starting}</span>
                      </td>
                      <td className="py-4 px-8 text-center">
                        <span>{item.destination}</span>
                      </td>
                      <td className="py-4 px-8 text-center">
                        {car.map(
                          (cars) =>
                            cars.id === item.car_id && (
                              <span key={cars.id}>
                                {cars.make} {"-"} {cars.model}
                              </span>
                            )
                        )}
                      </td>
                      <td className="py-4 px-8 text-center">
                        {drivers.map(
                          (driver) =>
                            driver.id === item.driver_id && (
                              <span key={driver.id}>
                                {driver.first_name} {driver.last_name}
                              </span>
                            )
                        )}
                      </td>
                      <td className="py-4 px-8 text-center">
                        {item.status === "active" ? (
                          <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-sm">
                            Aktif
                          </span>
                        ) : (
                          <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-sm">
                            Pasif
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-8 text-center">
                        <div className="flex item-center justify-center">
                          <Link
                            onClick={() => handleDetailRoute()}
                            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor:pointer"
                          >
                            <i class="fas fa-info-circle"></i>
                          </Link>
                          <Link
                            to={`/edit-fleet/${item._id}`}
                            className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                          <Link
                            // onClick={() => handleDeleteFleet(item)}
                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default Table;
