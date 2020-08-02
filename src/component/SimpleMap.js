import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import Polyline_decoder from "./polyline_decoder";

const SimpleMap = (props: any) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBdNYLs-vqWXBDAjxXvbKe6igT9v7pqrps" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={11.0168} lng={76.9558} name="My Marker" color="blue" />
      </GoogleMapReact>

      <Polyline_decoder />
    </div>
  );
};

export default SimpleMap;
