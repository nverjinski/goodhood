import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

const DeckGLOverlayComponent = ({ layers }) => {
  const map = useMap();
  const [overlay] = useState(() => new GoogleMapsOverlay());

  useEffect(() => {
    if (!map) {
      return;
    }
    overlay.setMap(map);

    return () => overlay.setMap(null);
  }, [map, overlay]);

  useEffect(() => {
    overlay.setProps({ layers });
  }, [layers, overlay]);

  return null;
};

export default DeckGLOverlayComponent;
