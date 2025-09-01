import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "@components/base/ToggleSwitch";
import { toggleActiveLayer } from "../../app/layerSlice";

const layerName = "gunCrimeLayer";

const GunCrimeLayerSettings = () => {
  const dispatch = useDispatch();
  const isLayerActive = useSelector(
    (state) => state.layer.layers.gunCrimeLayer.active
  );

  return (
    <ToggleSwitch
      label="Gun Crime Layer"
      checked={isLayerActive}
      onChange={() => dispatch(toggleActiveLayer(layerName))}
    />
  );
};
export default GunCrimeLayerSettings;
