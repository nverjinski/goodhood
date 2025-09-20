import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

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
  padding: 0 7px;
  border: 1px solid ${({ theme }) => theme.light_line_divider};
  border-radius: 4px;
  pointer-events: none;

  ${({ theme, $hasHovered }) =>
    $hasHovered &&
    css`
      border-color: ${theme.primary_text};
    `}

  ${({ theme, $hasFocus }) =>
    $hasFocus &&
    css`
      border-color: ${theme.primary_text};
      border-width: 1.5px;
    `}
`;

// The floating label.
const StyledLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${({ theme }) => theme.secondary_text};
  pointer-events: none;
  transition: all 0.15s ease-in-out;
  transform-origin: left top;

  ${({ theme, $hasFocus }) =>
    $hasFocus &&
    css`
      color: ${theme.primary_text};
    `}
  ${({ $hasValue, $hasFocus }) =>
    ($hasValue || $hasFocus) &&
    css`
      transform: translateY(-38px) scale(0.8);
    `}
`;

// An invisible Legend whose only job is to create the "cutout" in the Fieldset's border.
const StyledLegend = styled.legend`
  padding: 0;
  text-align: left;
  max-width: 0.01px;
  font-size: 0.8em;
  visibility: hidden;
  transition: max-width 150ms cubic-bezier(0, 0, 0.2, 1);

  & > span {
    display: inline-block;
    padding-left: 0px;
    padding-right: 5px;
    white-space: nowrap;
  }

  ${({ $hasFocus, $hasValue }) =>
    ($hasFocus || $hasValue) &&
    css`
      max-width: 100%;
    `}
`;

const PasswordToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  height: 24px;
  width: 24px;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: ${({ theme }) => theme.secondary_text};

  &:focus {
    outline: none; // Or a custom focus style
  }
`;

/**
 * A custom TextField component that mimics the appearance of a Material-UI TextField.
 * @param {object} props - The component props.
 * @param {string} props.id - A unique ID to link the label and the input for accessibility.
 * @param {string} props.type - Type of input. Options are 'text' or 'password'. Defaults to 'text'.
 * @param {string} props.label - The label for the text field.
 * @param {string} [props.value] - The controlled value of the input. Defaults to an empty string.
 * @param {(value: string) => void} [props.onChange] - A callback function that fires when the input value changes.
 * @returns {JSX.Element} The rendered TextInput component.
 */
const TextField = React.forwardRef(
  (
    {
      id,
      type = "text",
      label,
      value: propsValue = "",
      onChange = () => {},
      onFocusChange = () => {},
    },
    ref
  ) => {
    const [value, setValue] = useState(propsValue);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const hasFocus = isFocused;
    const hasHovered = isHovered;
    const hasValue = value !== "";

    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    useEffect(() => {
      if (propsValue !== value) {
        setValue(propsValue);
      }
    }, [propsValue]);

    useEffect(() => {
      onFocusChange(isFocused);
    }, [isFocused]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (e) => {
      setValue(e.target.value);
      onChange(e.target.value);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <StyledInputWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <StyledLabel $hasFocus={hasFocus} $hasValue={hasValue} htmlFor={id}>
          {label}
        </StyledLabel>
        <InputBase
          id={id}
          type={inputType}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={ref}
        />
        {type === "password" && value && (
          <PasswordToggleButton
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </PasswordToggleButton>
        )}
        <StyledFieldSet
          aria-hidden="true"
          $hasFocus={hasFocus}
          $hasHovered={hasHovered}
        >
          <StyledLegend $hasFocus={hasFocus} $hasValue={hasValue}>
            <span>{label}</span>
          </StyledLegend>
        </StyledFieldSet>
      </StyledInputWrapper>
    );
  }
);

export default TextField;
