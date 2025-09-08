import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useDeckLayers } from "@hooks/useDeckLayers";
import { useTheme } from "@contexts/ThemeContext";
import {
  MIN_ZOOM,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
} from "@constants/googleMap";
import LocationMarker from "@maps/markers/LocationMarker";
import DeckOverlay from "@maps/DeckOverlay";

const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

const GoogleMap = () => {
  const { theme } = useTheme();

  const [hoverInfo, setHoverInfo] = useState(null);

  const locationHistory = useSelector(
    (state) => state.location.locationHistory
  );

  const handleHover = useCallback((info) => {
    setHoverInfo((prevInfo) => {
      if (info?.index === -1) {
        return null;
      }
      if (prevInfo?.index === info.index) {
        return prevInfo;
      }
      return info;
    });
  }, []);

  const layers = useDeckLayers(handleHover);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <Map
        /*
          Setting the key={theme} ensures that the map updates when the theme changes. This was necessary
          because the layers were not rendering correctly when the theme was toggled 4x. This solution reloads the map
          and google will charge for the map load. TODO: find another solution to the layer rendering issue
        */
        key={theme.mode}
        defaultCenter={DEFAULT_MAP_CENTER}
        defaultZoom={DEFAULT_MAP_ZOOM}
        minZoom={MIN_ZOOM}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={mapId}
        // Setting this to false fixes the bug of changing theme multiple times causing layers not to render
        reuseMaps={true}
        colorScheme={theme.mode.toUpperCase()}
      >
        <DeckOverlay layers={layers} />
        {locationHistory.map((location) => (
          <AdvancedMarker
            key={location.place_id}
            position={location.geometry.location}
          >
            <LocationMarker
              id={location.place_id}
              address={location.structured_formatting.main_text}
            />
          </AdvancedMarker>
        ))}
      </Map>

      {hoverInfo && hoverInfo.object && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: hoverInfo.x,
            top: hoverInfo.y,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "sans-serif",
            transform: "translate(10px, -10px)",
          }}
        >
          <div>Date: {hoverInfo.object.date}</div>
          <div>Killed: {hoverInfo.object.n_killed}</div>
          <div>Injured: {hoverInfo.object.n_injured}</div>
          <div>Notes: {hoverInfo.object.notes}</div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
