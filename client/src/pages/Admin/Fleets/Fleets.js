import React from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import Navbar from "../../../components/Navbar/Navbar";
import useFetch from "../../../hooks/useFetch";
import Table from "./Table";

function Fleets() {
  const { data, loading, error, reFetchUser } = useFetch(
    "/fleet/getAllFleets"
  );
  
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>

        {loading && <Loading></Loading>}

        {!loading && (
          <main className="w-full flex-grow p-6">
            {data.length === 0 ? (
              <h1 className="text-2xl text-black ">Henüz filo yok !</h1>
            ) : (
              <>
                <h1 className="text-2xl text-black ">
                  Filolar ({data.length})
                </h1>
                <Table fleets={data} reFetchUser={reFetchUser}></Table>
              </>
            )}
          </main>
        )}

        <Footer></Footer>
      </div>
    </div>
  );
}

export default Fleets;
