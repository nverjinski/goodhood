import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  height: 38px;
  padding: 7.5px 4px 7.5px 5px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: ${({ theme }) => theme.primary_text};
  box-sizing: border-box;
  background-color: transparent;
  bottom: 0;
  left: 0;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

/**
 * A styled, un-controlled base component for text input. This should always be
 * wrapped by a parent component that provides a label and manages state.
 * @param {object} props - The component props.
 * @param {string} props.id - A unique ID to link the input to its label for accessibility.
 * @param {string} props.value - The controlled value of the input.
 * @param {React.FocusEventHandler<HTMLInputElement>} props.onFocus - Handler for the focus event.
 * @param {React.FocusEventHandler<HTMLInputElement>} props.onBlur - Handler for the blur event.
 * @param {React.ChangeEventHandler<HTMLInputElement>} props.onChange - Handler for the change event.
 * @returns {JSX.Element} The rendered InputBase component.
 */
const InputBase = React.forwardRef(
  ({ id, value, onFocus, onBlur, onChange }, ref) => {
    return (
      <StyledInput
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
      />
    );
  }
);
export default InputBase;
