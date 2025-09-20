import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleModalOpen } from "@store/appSlice";
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
  color: ${({ theme }) => theme.primary_text};
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
  background-color: ${({ theme }) => theme.success};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.heavy_success};
  }

  &:active {
    background-color: ${({ theme }) => theme.heavy_success};
  }
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.primary_text};
  text-decoration: none;
  text-align: right;
  cursor: pointer;
  margin-top: -2px;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
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

      <Button onClick={() => dispatch(toggleModalOpen("loginModal"))}>
        Sign In
      </Button>
    </AuthContainer>
  );
};

export default AuthenticationDialogContent;
