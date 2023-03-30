import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";

function Home() {

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          <Dashboard></Dashboard>
          {/* <Footer></Footer> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
