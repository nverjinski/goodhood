import { memo } from "react";
import styled from "styled-components";
import { HomeIcon } from "@heroicons/react/24/solid";

const MarkerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pill = styled.div`
  padding: 3px;
  background-color: ${({ theme }) => theme.primary_text};
  border-radius: 50%;
  color: ${({ theme }) => theme.primary_base};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 5px rgba(255, 255, 255, 0.3)"
      : "0 2px 5px rgba(0, 0, 0, 0.3)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const PinLine = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${({ theme }) => theme.primary_text};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 5px rgba(255, 255, 255, 0.3)"
      : "0 2px 5px rgba(0, 0, 0, 0.3)"};
`;

const PinBase = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary_text}4D;
  margin-top: -7px;
`;

const IconWrapper = styled.div`
  width: 22px;
  height: 22px;
  color: ${({ theme }) => theme.primary_base};
`;

const LocationMarker = memo(() => {
  return (
    <MarkerContainer>
      <Pill>
        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
      </Pill>
      <PinLine />
      <PinBase />
    </MarkerContainer>
  );
});

export default LocationMarker;
