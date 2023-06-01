import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { TileLayer, MapContainer, LayersControl, useMap } from "react-leaflet";
import RoutingControl, { tempInstance } from "./RoutingControl";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useDispatch, useSelector } from "react-redux";
import { addMap, addMapNames } from "../../../../redux/mapSlice";
import { visibilityChange, visibilityChangeMapModal } from "../../../../redux/modalSlice";

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const Map = ({ startLatLong, endLatLong }) => {
  const [map, setMap] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [startName, setStartName] = useState(null);
  const [endName, setEndName] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.modals.modal);

  const provider = new OpenStreetMapProvider();
  const handleAddressSearch = async (addressType, address) => {
    try {
      const results = await provider.search({ query: address });
      if (results !== undefined || results !== null || results !== "") {
        setResponse(results);
        console.log("results", results[0]);
        const lat = results[0].y;
        const lng = results[0].x;
        if (addressType === "start") {
          setStart([lat, lng]);
          setStartName(address);
        } else {
          setEnd([lat, lng]);
          setEndName(address);
        }
      }

      // mapRef.current.setView(markerPosition, 13);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    MyComponent();
  }, [start, end]);

  const addDistanceTime = () => {
    if (tempInstance !== undefined) {
      let mapNames = {
        startName: startName,
        endName: endName,
        start: start,
        end: end,
      };
      dispatch(addMapNames(mapNames));
      dispatch(addMap(tempInstance));
      handleVisibilityModal();
    }
  };

  const handleVisibilityModal = () => {
    dispatch(visibilityChangeMapModal(false));
  };

  function MyComponent(props) {
    // const map = useMap();
    // map.setView(start);

    if (modal) {
      return (
        <RoutingControl
          position={"topleft"}
          start={startLatLong}
          end={endLatLong}
          color={"#757de8"}
        />
      );
    } else {
      return (
        <RoutingControl
          position={"topleft"}
          start={start}
          end={end}
          color={"#757de8"}
        />
      );
    }
  }

  return (
    <>
      <MapContainer
        center={[40.766941637829504, 29.91826510015192]}
        zoom={3}
        zoomControl={false}
        style={{
          height: !modal ? "100vh" : "100%",
          width: "100%",
          padding: 0,
          position: "relative",
        }}
        whenCreated={(map) => setMap(map)}
      >
        <MyComponent />
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}
        {/* <RoutingControl
          position={"topleft"}
          start={start}
          end={end}
          color={"#757de8"}
        /> */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {!modal && (
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              top: "5%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
          >
            <input
              onChange={(e) => handleAddressSearch("start", e.target.value)}
              placeholder="Başlangıç Noktası"
              list="browsers"
              name="browser"
              id="browser"
              style={{
                width: 225,
                padding: "12px 20px",
                margin: "8px 0",
                fontSize: 13,
                borderRadius: 5,
                border: "1px solid gray",
              }}
            />
            <input
              onChange={(e) => handleAddressSearch("end", e.target.value)}
              style={{
                width: 225,
                padding: "12px 20px",
                margin: "8px 10px",
                fontSize: 13,
                borderRadius: 5,
                border: "1px solid gray",
              }}
              placeholder="Varış Noktası"
              list="browsers"
              name="browser"
              id="browser"
            />
            <button
              onClick={addDistanceTime}
              className="px-3 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              Kaydet
            </button>
            {response && (
              <datalist id="browsers">
                {response.map((i) => (
                  <option value={i.label} />
                ))}
              </datalist>
            )}
          </div>
        )}
      </MapContainer>
    </>
  );
};

export default Map;
