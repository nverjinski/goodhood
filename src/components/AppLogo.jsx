import styled from "styled-components";

const Logo = styled.div`
  font-family: "Playwrite HU", cursive;
  font-weight: 400;
  font-size: 32px;
  font-style: normal;
  color: ${({ theme }) => theme.text.primary};
`;

const AppLogo = () => {
  const logoText = `GoodHood`;
  return <Logo>{logoText}</Logo>;
};

export default AppLogo;
