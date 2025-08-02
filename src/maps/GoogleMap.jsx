import { useMemo, useState, useCallback } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { ScatterplotLayer } from "@deck.gl/layers";
import sourceData from "@datasets/gun_violence_2024.json";
import DeckGLOverlayComponent from "./DeckOverlay";
import { useTheme } from "@contexts/ThemeContext";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

const GoogleMap = () => {
  const { theme } = useTheme();
  const defaultMapCenter = { lat: 38.894382, lng: -77.036528 }; // Washington, DC
  const defaultMapZoom = 12;

  const [hoverInfo, setHoverInfo] = useState(null);

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
    if (!Array.isArray(sourceData)) {
      return [];
    }
    return [
      new ScatterplotLayer({
        id: "scatterplot-layer",
        data: sourceData,
        opacity: 1, // between 0 and 1
        stroked: true,
        getLineWidth: 1,
        filled: true,
        lineWidthMaxPixels: 1,
        radiusMinPixels: 7,
        radiusMaxPixels: 20,
        pickable: true,
        onHover: handleHover,
        getPosition: (d) => [d.longitude, d.latitude],
        getFillColor: (d) =>
          d.n_killed > 0 ? [255, 0, 0, 100] : [255, 197, 0, 100],
        parameters: {
          depthTest: false,
        },
      }),
    ];
  }, [sourceData, handleHover, theme]);

  if (!apiKey) {
    console.error("Error: Missing Google Maps API Key");
    return <div>Error: Missing Google Maps API Key</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={defaultMapCenter}
          defaultZoom={defaultMapZoom}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={mapId}
          // Setting this to false fixes the bug of changing theme multiple times causing layers not to render
          reuseMaps={true}
          colorScheme={theme.toUpperCase()}
        >
          <DeckGLOverlayComponent key={theme} layers={layers} />
        </Map>
      </APIProvider>

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
