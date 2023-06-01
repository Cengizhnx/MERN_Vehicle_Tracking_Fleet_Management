import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../redux/modalSlice";
import drivers from "../../data/drivers.json";
import moment from "moment";
import Map from "../../pages/Admin/Routes/Map/Map";

export default function Modal({ car }) {
  const dispatch = useDispatch();

  const route = useSelector((state) => state.routes.route);
  const customers = useSelector((state) => state.customers.customer);

  console.log([route]);
  // const filtered = routes.filter((item) => item.customer_id === user._id);

  const handleDetailRoute = () => {
    dispatch(visibilityChange(false));
  };

  return (
    <div className="overlayChat">
      <div className="modalChatContainer">
        <div className="chat-header">
          <p className="text-lg font-medium">Detaylar</p>
          <div onClick={() => handleDetailRoute()}>
            <i className="fas fa-times fa-lg mt-1 cursor-pointer"></i>
          </div>
        </div>
        <div className="chat-area">
          <div className="flex flex-col h-full space-y-5 md:space-y-0">
            {[route].map((item) => (
              <>
                <div className="flex flex-col md:flex-row w-full h-full md:h-1/2 items-center justify-center mt-5 md:mt-0 space-x-0 md:space-x-5 space-y-5 md:space-y-0">
                  {/* Rota Bilgileri */}

                  <div className="w-full h-5/6 flex flex-col items-center justify-center rounded-lg space-y-5">
                    <div className="w-full md:w-1/2 h-5/6 flex flex-row items-center justify-center rounded-lg space-x-5">
                      <div className="flex flex-col space-y-5">
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="fas fa-plane-departure text-blue-500"></i>
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">
                              Hareket Noktası
                            </h2>
                            <p class="mt-2 font-wider font-semibold">
                              {item.starting}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="fas fa-plane-arrival text-blue-500"></i>
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">Varış Noktası</h2>
                            <p class="mt-2 font-wider font-semibold">
                              {item.destination}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-5">
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="far fa-clock text-blue-500"></i>
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">
                              Hareket Zamanı
                            </h2>
                            <p class="mt-2 font-wider font-semibold">
                              {moment(route.createdAt).format(
                                "H:mm - DD.MM.YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="fas fa-info text-blue-500"></i>{" "}
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">Rota Durumu</h2>
                            <p class="mt-2 font-wider font-semibold">
                              {item.status === "active"
                                ? "Yolda"
                                : "Tamamlandı"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-5">
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="fas fa-location-arrow text-blue-500"></i>
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">
                              Toplam Mesafe
                            </h2>
                            <p class="mt-2 font-wider font-semibold">
                              {route.distance} km
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center justify-center rounded-xl bg-white p-4 shadow-md md:w-48">
                          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                            <i class="fas fa-hourglass text-blue-500"></i>{" "}
                          </div>

                          <div class="ml-4">
                            <h2 class="text-sm text-gray-600">Toplam Süre</h2>
                            <p class="mt-2 font-wider font-semibold">
                              {item.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Araç Bilgileri */}
                  {car.map(
                    (cars) =>
                      cars.id === item.car_id && (
                        <div className="w-2/3 h-full flex flex-col items-center justify-center rounded-lg space-y-5">
                          <div className="flex flex-row space-x-5">
                            <div class="flex items-start rounded-xl bg-white p-4 shadow-md md:w-48 ">
                              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                <i class="fas fa-car"></i>
                              </div>

                              <div class="ml-4">
                                <h2 class="text-sm text-gray-600">Marka</h2>
                                <p class="mt-2 font-wider font-semibold">
                                  {cars.make}
                                </p>
                              </div>
                            </div>
                            <div class="flex items-start rounded-xl bg-white p-4 shadow-md md:w-48">
                              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                <i class="fas fa-car"></i>
                              </div>

                              <div class="ml-4">
                                <h2 class="text-sm text-gray-600">Model</h2>
                                <p class="mt-2 font-wider font-semibold">
                                  {cars.model}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row space-x-5">
                            <div class="flex items-start rounded-xl bg-white p-4 shadow-md md:w-48">
                              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                <i class="fas fa-car"></i>
                              </div>

                              <div class="ml-4">
                                <h2 class="text-sm text-gray-600">Tip</h2>
                                <p class="mt-2 font-wider font-semibold">
                                  {cars.type}
                                </p>
                              </div>
                            </div>
                            <div class="flex items-start rounded-xl bg-white p-4 shadow-md md:w-48">
                              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                                <i class="fas fa-calendar-day"></i>{" "}
                              </div>

                              <div class="ml-4">
                                <h2 class="text-sm text-gray-600">Yıl</h2>
                                <p class="mt-2 font-wider font-semibold">
                                  {cars.year}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>

                <div className="flex flex-col md:flex-row w-full h-full md:h-1/2 items-center justify-center space-x-0 md:space-x-5 space-y-5 md:space-y-0">
                  {/* Müşteri Bilgileri */}
                  {
                    <div class="w-full h-full p-2 border border-gray-100 rounded-lg">
                      <Map
                        startLatLong={[route][0].start}
                        endLatLong={[route][0].end}
                      ></Map>
                    </div>
                  }

                  {/* Şöfor Bilgileri */}
                  {drivers.map(
                    (driver) =>
                      driver.id === item.driver_id && (
                        <div class="w-2/3 h-5/6 p-6 border border-gray-100 rounded-lg">
                          <div class="w-14 h-14 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            <img
                              src={driver.avatar}
                              className="rounded-full object-cover"
                              alt=""
                            />
                          </div>
                          <h2 class="text-lg  font-medium title-font mb-2">
                            {driver.first_name} {driver.last_name} -{" "}
                            {driver.age}
                          </h2>
                          <p class="leading-relaxed text-base">
                            {item.starting} - {item.destination} rotasında çalışmaktadır.
                          </p>

                          <div class="text-center mt-4 leading-none flex justify-between w-full">
                            <span class="mr-3 inline-flex items-center leading-none text-sm py-1">
                              <i class="fas fa-phone-alt mr-2 text-blue-500"></i>
                              {driver.phone}
                            </span>
                            {/* <span class=" inline-flex items-center leading-none text-sm">
                              <svg
                                width="22"
                                height="22"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g fill="none" fill-rule="evenodd">
                                  <path
                                    fill="#D8D8D8"
                                    d="M9.2 6.583v11.08h3.5V6.583zm6.4 11.084h3.5V3h-3.5z"
                                  />
                                  <path
                                    fill="#667EEA"
                                    d="M2.6 17.667h3.5v-7.334H2.6z"
                                  />
                                </g>
                              </svg>
                              Débutant
                            </span> */}
                          </div>
                        </div>
                      )
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="chat-typing-area-wrapper"></div>
      </div>
    </div>
  );
}
