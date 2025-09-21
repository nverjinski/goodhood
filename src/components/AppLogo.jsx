import styled from "styled-components";

const Logo = styled.div`
  font-family: "Playwrite HU", cursive;
  font-weight: 400;
  font-size: 32px;
  font-style: normal;
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  user-select: none;
`;

const AppLogo = ({ onClick = () => {} }) => {
  const logoText = `GoodHood`;
  return <Logo onClick={onClick}>{logoText}</Logo>;
};

export default AppLogo;
