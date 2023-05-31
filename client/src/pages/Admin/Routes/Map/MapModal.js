import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../../../redux/modalSlice";
import Map from "./Map";

function MapModal() {
  const dispatch = useDispatch();

  const handleDetailRoute = () => {
    dispatch(visibilityChange(false));
  };
  
  return (
    <div className="overlayChat">
      <div className="modalMapContainer">
        <div className="chat-header">
          <p className="text-lg font-medium">Detaylar</p>
          <div onClick={() => handleDetailRoute()}>
            <i className="fas fa-times fa-lg mt-1 cursor-pointer"></i>
          </div>
        </div>
        <div className="chat-area">
            <Map></Map>
        </div>
        <div className="chat-typing-area-wrapper"></div>
      </div>
    </div>
  );
}

export default MapModal;
