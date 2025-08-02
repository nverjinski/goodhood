import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const DeckOverlay = ({ layers }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return undefined;
    }

    // Create a new overlay instance every time the map or layers change.
    const overlay = new GoogleMapsOverlay({
      layers,
    });

    overlay.setMap(map);

    return () => {
      overlay.finalize();
    };
  }, [map, layers]);

  return null;
};

export default DeckOverlay;
