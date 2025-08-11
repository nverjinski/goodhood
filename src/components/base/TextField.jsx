import { useState } from "react";
import styled, { css } from "styled-components";
import InputBase from "./InputBase";

// Main container for the input and label
const StyledInputWrapper = styled.div`
  position: relative;
  width: calc(100% - 48px);
  padding: 9px 39px 9px 9px;
`;

// A Fieldset that provides the visible border around the wrapper.
const StyledFieldSet = styled.fieldset`
  position: absolute;
  top: -10px; /* Positions the top border slightly above the input to make room for the label */
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  /* Adjusted padding to perfectly align the legend with the label */
  padding: 0 7px;
  border: 1px solid ${({ theme }) => theme.light_line_divider};
  border-radius: 4px;
  pointer-events: none;

  ${({ theme, hasHovered }) =>
    hasHovered &&
    css`
      border-color: ${theme.primary_text};
    `}

  /* Change border color on focus */
  ${({ hasFocus }) =>
    hasFocus &&
    css`
      border-color: #007bff;
      border-width: 2px;
    `}
`;

// The floating label.
const StyledLabel = styled.label`
  position: absolute;
  left: 12px;
  /* Centered vertically within the 50px wrapper */
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ theme }) => theme.secondary_text};
  pointer-events: none;
  transition: all 0.15s ease-in-out;
  transform-origin: left top;

  /* This 'css' block applies when the input has a value or is focused */
  ${({ hasFocus }) =>
    hasFocus &&
    css`
      color: #007bff;
    `}
  ${({ hasValue, hasFocus }) =>
    (hasValue || hasFocus) &&
    css`
      transform: translateY(-38px) scale(0.8);
    `}
`;

// An invisible Legend whose only job is to create the "cutout" in the Fieldset's border.
const StyledLegend = styled.legend`
  padding: 0;
  text-align: left;
  max-width: 0.01px;
  /* Font size must match the scaled label size */
  font-size: 0.8em;
  visibility: hidden;
  transition: max-width 150ms cubic-bezier(0, 0, 0.2, 1);

  & > span {
    display: inline-block;
    padding-left: 0px;
    padding-right: 5px;
    /* This prevents the text from breaking into multiple lines */
    white-space: nowrap;
  }

  /* Expand the legend to fit its text content when the input is active */
  ${({ hasFocus, hasValue }) =>
    (hasFocus || hasValue) &&
    css`
      max-width: 100%;
    `}
`;

/**
 * A custom TextField component that mimics the appearance of a Material-UI TextField.
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {string} props.id - A unique ID to link the label and the input for accessibility.
 * @param {string} [props.value] - The controlled value of the input. Defaults to an empty string.
 * @param {(value: string) => void} [props.onChange] - A callback function that fires when the input value changes.
 * @returns {JSX.Element} The rendered TextInput component.
 */
const TextField = ({
  label,
  id,
  value: propsValue = "",
  onChange = () => {},
}) => {
  const [value, setValue] = useState(propsValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hasFocus = isFocused;
  const hasHovered = isHovered;
  const hasValue = value !== "";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <StyledInputWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledLabel hasFocus={hasFocus} hasValue={hasValue} htmlFor={id}>
        {label}
      </StyledLabel>
      <InputBase
        id={id}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <StyledFieldSet
        aria-hidden="true"
        hasFocus={hasFocus}
        hasHovered={hasHovered}
      >
        <StyledLegend hasFocus={hasFocus} hasValue={hasValue}>
          <span>{label}</span>
        </StyledLegend>
      </StyledFieldSet>
    </StyledInputWrapper>
  );
};

export default TextField;
