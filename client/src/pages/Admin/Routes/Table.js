import React from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import drivers from "../../../data/drivers.json";
import useCarFetch from "../../../hooks/useCarFetch";
import {
  visibilityChange,
  visibilityChangeRouteModal,
} from "../../../redux/modalSlice";
import { addRoute } from "../../../redux/routeSlice";
import Modal from "../../../components/Modal/Modal";
import ExcelJS from "exceljs";
import moment from "moment";
import RouteModal from "../../../components/Modal/RouteModal";

function Table({ routes, reFetchUser }) {
  const { data, loading, error } = useFetch(`/fleet/getAllFleets`);
  const { car, carLoading, carEror, reFetchCar } = useCarFetch();

  const user = useSelector((state) => state.users.user);
  const customer = useSelector((state) => state.customers.customer);
  const modal = useSelector((state) => state.modals.modal);
  const routeModal = useSelector((state) => state.modals.routeModal);

  const dispatch = useDispatch();

  const filtered = data.filter((item) => item.fleetOwner === user._id);

  const handleDetailRoute = (route) => {
    dispatch(addRoute(route));
    dispatch(visibilityChange(true));
  };

  const handleDetailModalRoute = (route) => {
    dispatch(addRoute(route));
    dispatch(visibilityChangeRouteModal(true));
  };

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Rotalar");

    sheet.columns = [
      {
        header: "Id",
        key: "id",
        width: 30,
      },
      {
        header: "Hareket Noktası",
        key: "starting",
        width: 20,
      },
      {
        header: "Varış Noktası",
        key: "destination",
        width: 20,
      },
      {
        header: "Hareket Zamanı",
        key: "time",
        width: 25,
      },
      {
        header: "Durum",
        key: "status",
        width: 15,
      },
      {
        header: "Araba Markası",
        key: "make",
        width: 20,
      },
      {
        header: "Araba Modeli",
        key: "model",
        width: 20,
      },
      {
        header: "Araba Tipi",
        key: "type",
        width: 20,
      },
      {
        header: "Araba Yılı",
        key: "year",
        width: 15,
      },
      {
        header: "Şöfor Adı",
        key: "driverName",
        width: 25,
      },
      {
        header: "Şöfor Resmi",
        key: "driverAvatar",
        width: 30,
      },
      {
        header: "Şöfor Yaşı",
        key: "driverAge",
        width: 15,
      },
      {
        header: "Şöfor Telefon No",
        key: "driverPhone",
        width: 20,
      },
    ];

    routes?.map(async (item) =>
      filtered.map(
        async (i) =>
          item.fleet_id === i._id &&
          car.map(
            (cars) =>
              cars.id === item.car_id &&
              drivers.map(
                (driver) =>
                  driver.id === item.driver_id &&
                  sheet.addRow({
                    id: item?._id,
                    starting: item?.starting,
                    destination: item?.destination,
                    time: moment(item?.createdAt).format("DD.MM.YYYY - H:mm"),
                    status: item?.status === "active" ? "Yolda" : "Tamamlandı",
                    driverName: driver.first_name + " " + driver.last_name,
                    driverAvatar: driver.avatar,
                    driverAge: driver.age,
                    driverPhone: driver.phone,
                    make: cars.make,
                    model: cars.model,
                    type: cars.type,
                    year: cars.year,
                  })
              )
          )
      )
    );

    workbook.xlsx.writeBuffer().then(function (routes) {
      const blob = new Blob([routes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "routes.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center font-sans overflow-auto">
      {loading && carLoading && <Loading></Loading>}
      {!loading && !carLoading && customer && (
        <>
          {user.name !== "admin" && (
            <div className="w-full flex flex-col items-end justify-end">
              <button
                className="px-3 py-1 text-white font-light tracking-wider bg-green-500 rounded"
                onClick={exportExcelFile}
              >
                <i class="fas fa-file-excel"></i>
              </button>
            </div>
          )}

          <div className="w-full">
            {modal && <Modal car={car}></Modal>}
            {routeModal && <RouteModal reFetchUser={reFetchUser}></RouteModal>}
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    {user.name === "admin" && (
                      <th className="py-4 px-8 text-center">Sahibi</th>
                    )}
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
                    user.name !== "admin"
                      ? filtered.map(
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
                                  {item.status === "active" && (
                                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-sm">
                                      Yolda
                                    </span>
                                  )}
                                  {item.status === "passive" && (
                                    <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-sm">
                                      İptal Edildi
                                    </span>
                                  )}
                                  {item.status === "completed" && (
                                    <span class="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm">
                                      Tamamlandı
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
                                      onClick={() =>
                                        handleDetailModalRoute(item)
                                      }
                                      className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                                    >
                                      <i className="fas fa-pen"></i>
                                    </Link>
                                    {/* <Link
                                      // onClick={() => handleDeleteFleet(item)}
                                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </Link> */}
                                  </div>
                                </td>
                              </tr>
                            )
                        )
                      : customer.map(
                          (i) =>
                            i._id === item.customer_id && (
                              <tr
                                key={item._id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                              >
                                <td className="py-4 px-8 text-center">
                                  <span>{i.name}</span>
                                </td>
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
                                  {item.status === "active" && (
                                    <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-sm">
                                      Yolda
                                    </span>
                                  )}
                                  {item.status === "passive" && (
                                    <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-sm">
                                      İptal Edildi
                                    </span>
                                  )}
                                  {item.status === "completed" && (
                                    <span class="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm">
                                      Tamamlandı
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
                                      onClick={() =>
                                        handleDetailModalRoute(item)
                                      }
                                      className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                                    >
                                      <i className="fas fa-pen"></i>
                                    </Link>
                                    {/* <Link
                                      // onClick={() => handleDeleteFleet(item)}
                                      className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </Link> */}
                                  </div>
                                </td>
                              </tr>
                            )
                        )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default Table;
