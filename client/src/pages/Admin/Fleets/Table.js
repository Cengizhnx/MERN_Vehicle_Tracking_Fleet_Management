import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { allCustomers } from "../../../redux/customerSlice";

function Table({ fleets, reFetchUser }) {
  const { data, loading, error } = useFetch(
    `/customer/getAllCustomers`
  );

  const dispatch = useDispatch();

  if (!loading) {
    dispatch(allCustomers(data));
  }

  const handleEditFleet = async (item) => {
    try {
      if (
        window.confirm(
          `Filoyu ${
            item.status === "active" ? "pasif" : "aktif"
          } duruma getirmek istediğinize emin misiniz ?`
        )
      ) {
        await axios.put(`/fleet/updateStatusFleet`, item);
        reFetchUser();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDeleteFleet = async (item) => {
    try {
      if (window.confirm("Filoyu silmek istediğinize emin misiniz ?")) {
        await axios.delete(`/fleet/deleteFleet/${item._id}`, item);
        reFetchUser();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center font-sans overflow-auto">
      {loading && <Loading></Loading>}
      {!loading && (
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-4 px-8 text-left">Sahibi</th>
                  <th className="py-4 px-8 text-left">Adı</th>
                  <th className="py-4 px-8 text-center">Adresi</th>
                  <th className="py-4 px-8 text-center">Durum</th>
                  <th className="py-4 px-8 text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {fleets.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-4 px-8 text-left">
                      <span>
                        {data.map((i) =>
                          i._id === item.fleetOwner ? i.name : ""
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-8 text-left">
                      <span>{item.fleetName}</span>
                    </td>
                    <td className="py-4 px-8 text-center">
                      <span>{item.fleetAddress}</span>
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
                          onClick={() => handleEditFleet(item)}
                          className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor:pointer"
                        >
                          {item.status === "active" ? (
                            <i className="fas fa-ban"></i>
                          ) : (
                            <i class="fas fa-check"></i>
                          )}
                        </Link>
                        <Link
                          to={`/edit-fleet/${item._id}`}
                          className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                        >
                          <i className="fas fa-pen"></i>
                        </Link>
                        <Link
                          onClick={() => handleDeleteFleet(item)}
                          className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
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
