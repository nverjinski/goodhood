import styled from "styled-components";

const Logo = styled.div`
  font-family: "Playwrite HU", cursive;
  font-weight: 400;
  font-size: 32px;
  font-style: normal;
  color: ${({ theme }) => theme.text.primary};
  cursor: ${({ "aria-role": ariaRole }) =>
    ariaRole === "button" ? "pointer" : "default"};
  user-select: none;
`;

const NOOP = () => {};

const AppLogo = ({ onClick = NOOP }) => {
  const logoText = `GoodHood`;

  const isInteractive = onClick !== NOOP;

  const handleKeyDown = (event) => {
    if (!isInteractive) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const accessibilityProps = isInteractive
    ? {
        "aria-role": "button",
        tabIndex: 0,
        onClick: onClick,
        onKeyDown: handleKeyDown,
      }
    : {
        "aria-role": "img",
        "aria-label": "GoodHood Logo",
      };

  return <Logo {...accessibilityProps}>{logoText}</Logo>;
};

export default AppLogo;
