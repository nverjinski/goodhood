import { useSelector, useDispatch } from "react-redux";
import ToggleSwitch from "@components/base/ToggleSwitch";
import { LAYER_NAMES } from "@constants/layers";
import { toggleActiveLayer } from "@store/layerSlice";

const OffenderLayerSettings = ({ disabled }) => {
  const dispatch = useDispatch();
  const isLayerActive = useSelector(
    (state) => state.layer.layers[LAYER_NAMES.OFFENDER_LAYER].active
  );

  return (
    <ToggleSwitch
      label="Sex Offenders"
      checked={isLayerActive}
      disabled={disabled}
      onChange={() => dispatch(toggleActiveLayer(LAYER_NAMES.OFFENDER_LAYER))}
    />
  );
};
export default OffenderLayerSettings;
