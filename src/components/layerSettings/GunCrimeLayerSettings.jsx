import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "@components/base/ToggleSwitch";
import { LAYER_NAMES } from "@constants/layers";
import { toggleActiveLayer } from "../../store/layerSlice";

const GunCrimeLayerSettings = () => {
  const dispatch = useDispatch();
  const isLayerActive = useSelector(
    (state) => state.layer.layers[LAYER_NAMES.GUN_CRIME_LAYER].active
  );

  return (
    <ToggleSwitch
      label="Gun Crime"
      checked={isLayerActive}
      onChange={() => dispatch(toggleActiveLayer(LAYER_NAMES.GUN_CRIME_LAYER))}
    />
  );
};
export default GunCrimeLayerSettings;
