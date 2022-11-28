import { useMap } from "react-map-gl";

export default function Isochrone() {
  const { current: map } = useMap();

  if (!map.getLayer("isochrone")) {
    // map.loadImage("/map-pin.png", (error, image) => {
    //   if (error) throw error;
    //   if (!map.hasImage("map-pin")) map.addImage("map-pin", image, { sdf: true });
    // });
  }

  return null;
}
