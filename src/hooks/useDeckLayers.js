import { useMemo, useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { ScatterplotLayer, IconLayer } from "@deck.gl/layers";
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
  const [offenderData, setOffenderData] = useState([]);
  const activeLayers = useSelector(
    (state) =>
      Object.keys(state.layer.layers).filter(
        (layerName) => state.layer.layers[layerName].active
      ),
    shallowEqual
  );
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  useEffect(() => {
    const isOffenderLayerActive = activeLayers.includes(
      LAYER_NAMES.OFFENDER_LAYER
    );

    if (isOffenderLayerActive && selectedLocation) {
      fetch(`/api/offenders?input=${selectedLocation.place_id}`)
        .then((res) => res.json())
        .then((data) => {
          setOffenderData(data);
        })
        .catch((error) => {
          console.error("Error fetching offender data:", error);
          setOffenderData([]);
        });
    } else {
      setOffenderData([]);
    }
  }, [activeLayers, selectedLocation]);

  const layers = useMemo(() => {
    const selectedLayers = [];
    const isOffenderLayerActive = activeLayers.includes(
      LAYER_NAMES.OFFENDER_LAYER
    );

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

    if (isOffenderLayerActive && offenderData.length) {
      selectedLayers.push(
        new IconLayer({
          id: "offender-layer",
          data: offenderData,

          iconAtlas:
            "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
          iconMapping:
            "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",

          getIcon: (d) => "marker-warning",
          getPosition: (d) => [
            d.locations[0].longitude,
            d.locations[0].latitude,
          ],
          getSize: 30, // in pixels
          getColor: (d) => [255, 0, 0], // Red
          pickable: true,
          // onClick: (info) => console.log('Clicked Pin:', info.object),
        })
      );
    }

    return selectedLayers;
  }, [activeLayers, handleHover, theme, offenderData, sourceData]);

  return layers;
};
