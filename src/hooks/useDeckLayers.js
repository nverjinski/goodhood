import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ScatterplotLayer } from "@deck.gl/layers";
import sourceData from "@datasets/gun_violence_2024.json";
import { LAYER_NAMES } from "@constants/layers";
import { useTheme } from "@contexts/ThemeContext";

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

export const useDeckLayers = (handleHover) => {
  const { theme } = useTheme();
  const activeLayers = useSelector((state) =>
    Object.keys(state.layer.layers).filter(
      (layerName) => state.layer.layers[layerName].active
    )
  );

  const layers = useMemo(() => {
    const selectedLayers = [];
    if (!Array.isArray(sourceData)) {
      return selectedLayers;
    }

    if (activeLayers.includes(LAYER_NAMES.GUN_CRIME_LAYER)) {
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
  }, [activeLayers, handleHover, theme]);

  return layers;
};
