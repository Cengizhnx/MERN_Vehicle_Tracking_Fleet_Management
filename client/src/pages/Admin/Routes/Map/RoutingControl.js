import L, { map } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

let tempInstance;
const createRoutineMachineLayer = ({ position, start, end, color }) => {
  const instance = L.Routing.control({
    position,
    waypoints: start?.length > 0 && end?.length > 0 ? [start, end] : [0, 0],
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });
  instance.on("routeselected", function (e) {
    var routeSummary = e.route;
    let minutes = (routeSummary.summary.totalTime % 36000) / 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    let distance = routeSummary.summary.totalDistance / 1000;
    const maps = {
      distance: distance,
      hours: hours,
      remainingMinutes: remainingMinutes.toString().slice(0, 2),
      route: routeSummary,
    };
    tempInstance = maps;
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

export { tempInstance };
