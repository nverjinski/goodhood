import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleModalOpen } from "@store/appSlice";
import { MODALS } from "@constants/app";
import { TextField } from "@components/base";

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  color: ${({ theme }) => theme.text.primary};
  text-align: center;
  font-weight: 600;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.accent.heavy};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.accent.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.accent.light};
  }
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
  text-decoration: none;
  text-align: right;
  cursor: pointer;
  margin-top: -2px;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.text.primary};
  }
`;

const AuthenticationDialogContent = () => {
  const dispatch = useDispatch();
  return (
    <AuthContainer>
      <Title>Sign In</Title>

      <TextField id="email" label="Email" />

      <InputGroup>
        <TextField id="password" type="password" label="Password" />
        <ForgotPasswordLink href="#">Forgot Password?</ForgotPasswordLink>
      </InputGroup>

      <Button onClick={() => dispatch(toggleModalOpen(MODALS.LOGIN_MODAL))}>
        Sign In
      </Button>
    </AuthContainer>
  );
};

export default AuthenticationDialogContent;
