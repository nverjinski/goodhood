import { useState, useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const DeckOverlay = ({ layers }) => {
  const map = useMap();

  const [overlay, setOverlay] = useState(null);

  // Create the overlay when the map is ready
  useEffect(() => {
    if (!map) {
      return;
    }

    const newOverlay = new GoogleMapsOverlay({});
    newOverlay.setMap(map);
    setOverlay(newOverlay);

    return () => {
      newOverlay.finalize();
      newOverlay.setMap(null);
    };
  }, [map]);

  // Update the overlay with new layers
  useEffect(() => {
    if (!overlay) {
      return;
    }

    overlay.setProps({ layers });
  }, [overlay, layers]);

  return null;
};

export default DeckOverlay;
