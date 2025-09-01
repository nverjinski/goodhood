import { useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { ScatterplotLayer } from "@deck.gl/layers";
import sourceData from "@datasets/gun_violence_2024.json";
import { useTheme } from "@contexts/ThemeContext";
import LocationMarker from "@maps/markers/LocationMarker";
import DeckOverlay from "./DeckOverlay";

const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;
const defaultMapCenter = { lat: 38.894382, lng: -77.036528 }; // Washington, DC
const defaultMapZoom = 12;

const scatterplotColors = {
  light: {
    killed: [255, 0, 0, 100],
    injured: [255, 197, 0, 100],
  },
  dark: {
    killed: [255, 20, 0, 140],
    injured: [255, 220, 50, 140],
  },
};

const GoogleMap = () => {
  const { theme } = useTheme();

  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [mapZoom, setMapZoom] = useState(defaultMapZoom);
  const [hoverInfo, setHoverInfo] = useState(null);

  const locationHistory = useSelector(
    (state) => state.location.locationHistory
  );
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const activeLayers = useSelector((state) =>
    Object.keys(state.layer.layers).filter(
      (layerName) => state.layer.layers[layerName].active
    )
  );

  const handleCameraChange = useCallback((e) => {
    if (!e.detail.center || !e.detail.zoom) return;
    setMapCenter(e.detail.center);
    setMapZoom(e.detail.zoom);
  }, []);

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

  const layers = useMemo(() => {
    const selectedLayers = [];
    if (!Array.isArray(sourceData)) {
      return selectedLayers;
    }

    if (activeLayers.includes("gunCrimeLayer")) {
      const colors = scatterplotColors[theme.mode];
      selectedLayers.push(
        new ScatterplotLayer({
          id: "scatterplot-layer",
          data: sourceData,
          opacity: 1, // between 0 and 1
          stroked: true,
          getLineWidth: 1,
          filled: true,
          lineWidthMaxPixels: 1,
          radiusMinPixels: 6,
          radiusMaxPixels: 20,
          pickable: true,
          onHover: handleHover,
          getPosition: (d) => [d.longitude, d.latitude],
          getFillColor: (d) =>
            d.n_killed > 0 ? colors.killed : colors.injured,
          parameters: {
            depthTest: false,
          },
        })
      );
    }

    return selectedLayers;
  }, [activeLayers, sourceData, handleHover, theme]);

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
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        onCameraChanged={handleCameraChange}
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
