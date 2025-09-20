import PropTypes from "prop-types";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  user-select: none;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.text.disabled : theme.text.primary};
  cursor: ${({ $disabled }) => !$disabled && "pointer"};
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const SwitchTrack = styled.div`
  position: relative;
  width: 33px;
  height: 18px;
  background-color: ${({ theme, checked, $disabled }) =>
    checked
      ? $disabled
        ? theme.secondary_base
        : theme.heavy_success
      : $disabled
      ? theme.secondary_base
      : theme.border.medium};
  border-radius: 9999px;
  transition: background-color 0.2s ease-in-out;
  cursor: ${({ $disabled }) => !$disabled && "pointer"};
`;

const SwitchThumb = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
  transform: ${({ checked }) =>
    checked ? "translateX(15px)" : "translateX(0)"};
`;

/**
 * A toggle switch component controlled by external state.
 * @param {object} props - The component props.
 * @param {string} props.label - The text label to display next to the switch.
 * @param {boolean} props.checked - The current state of the switch (on/off).
 * @param {function} props.onChange - The function to call when the switch is toggled.
 * @param {boolean} props.disabled - The value describing whether the switch is disabled.
 */
const ToggleSwitch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  return (
    <ToggleWrapper>
      <Label htmlFor={`toggle-switch-${label}`} $disabled={disabled}>
        {label}
      </Label>
      <SwitchTrack
        checked={checked}
        $disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      >
        <HiddenCheckbox
          id={`toggle-switch-${label}`}
          checked={checked}
          onChange={() => !disabled && onChange(!checked)}
        />
        <SwitchThumb checked={checked} $disabled={disabled} />
      </SwitchTrack>
    </ToggleWrapper>
  );
};

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
