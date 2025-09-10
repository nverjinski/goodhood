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
import HoverInfo from "@components/HoverInfo";
import LocationMarker from "@maps/markers/LocationMarker";
import DeckOverlay from "@maps/DeckOverlay";

const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

const GoogleMap = () => {
  const { theme } = useTheme();

  const [mapCenter, setMapCenter] = useState(DEFAULT_MAP_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_MAP_ZOOM);

  const [hoverInfo, setHoverInfo] = useState(null);

  const locationHistory = useSelector(
    (state) => state.location.locationHistory
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
        defaultCenter={mapCenter}
        defaultZoom={mapZoom}
        minZoom={MIN_ZOOM}
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

      {hoverInfo && hoverInfo.object && <HoverInfo hoverInfo={hoverInfo} />}
    </div>
  );
};

export default GoogleMap;
