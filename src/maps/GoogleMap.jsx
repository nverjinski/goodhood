import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import GoogleMapStyles from "./styles/GoogleMapStyles";

const GoogleMap = () => {
  const position = { lat: -34.397, lng: 150.644 };
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div>Error: Missing Google Maps API Key</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={8}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          styles={GoogleMapStyles}
        />
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
