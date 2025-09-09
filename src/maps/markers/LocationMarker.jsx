import { memo, useState, useMemo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { HomeIcon } from "@heroicons/react/24/solid";
import { setSelectedLocation } from "@store/locationSlice";

const MarkerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Pill = styled.div`
  padding: ${({ $isHovered }) => ($isHovered ? "4px 8px" : "3px")};
  background-color: ${({ theme }) => theme.primary_text};
  border-radius: ${({ $isHovered }) => ($isHovered ? "16px" : "50%")};
  color: ${({ theme }) => theme.primary_base};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 2px 5px rgba(255, 255, 255, 0.3)"
      : "0 2px 5px rgba(0, 0, 0, 0.3)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  min-height: 24px;
  min-width: 24px;
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

const LocationMarker = memo(({ id, address }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const shortAddress = useMemo(() => {
    if (!address) return "";
    return address.split(" ").slice(0, 2).join(" ");
  }, [address]);

  const handleLocationClick = (e) => {
    dispatch(setSelectedLocation(id));
    e.stopPropagation();
  };

  return (
    <MarkerContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => handleLocationClick(e)}
    >
      <Pill $isHovered={isHovered}>
        {isHovered ? (
          shortAddress
        ) : (
          <IconWrapper>
            <HomeIcon />
          </IconWrapper>
        )}
      </Pill>
      <PinLine />
      <PinBase />
    </MarkerContainer>
  );
});

export default LocationMarker;
