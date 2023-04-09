import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import Footer from "../../components/Footer/Footer";

function Home() {
  /* ADMIN 
  
  - Müşteri Ekle - Düzenle - Sil - Aktif/Pasif
  - Filo Ekle - Düzenle - Sil - Aktif/Pasif
  - Filoya Araba Ekle - Sil
  
  */

  /* Müşteri
  
  - Filo Düzenle - Sil - Aktif/Pasif
  - Filoya Araba Ekle - Sil
  - Arabaya Şöfor Ekle - Sil

  */

  /* Araç
  
  - Marka, Model, Tip, Yıl
  - Hangi şöfor kullanıyor ?
  - Hangi güzergah ?

  */

  /* Şöfor
  
  - Ad, Resim, Tel. No, Tarih
  - Hangi aracı kullanıyor ?
  - Hangi güzergah ?

  */

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
