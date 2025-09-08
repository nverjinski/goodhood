import { useMemo, useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const DeckOverlay = ({ layers }) => {
  const map = useMap();

  // Solves a subtle race condition where overlay isnt able to set its layers
  const overlay = useMemo(() => new GoogleMapsOverlay({}), []);

  useEffect(() => {
    if (map) {
      overlay.setMap(map);
    }

    return () => {
      overlay.setMap(null);
    };
  }, [map, overlay]);

  useEffect(() => {
    overlay.setProps({ layers });
  }, [overlay, layers]);

  return null;
};

export default DeckOverlay;
