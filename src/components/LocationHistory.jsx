import { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useMap } from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@heroicons/react/24/solid";
import mapUtils from "@utils/mapUtils";
import { setSelectedLocation } from "../app/locationSlice";

const StyledListContainer = styled.div`
  width: 100%;
`;

const ListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;

  border-left: 4px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.secondary_text : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.secondary_base};
  }
`;

const MapPinIconContainer = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  flex-shrink: 0;
  margin-right: 16px;
  color: ${({ theme }) => theme.secondary_text};
`;

const StyledIconButton = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.secondary_text};

  &:hover {
    color: ${({ theme }) => theme.primary_text};
  }
`;

const TextContainer = styled.div`
  flex-grow: 1;
  word-wrap: break-word;
  overflow: hidden;
`;

const MainText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary_text};
`;

const SecondaryText = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.secondary_text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LocationHistory = () => {
  const map = useMap();
  const dispatch = useDispatch();
  const locationHistory = useSelector(
    (state) => state.location.locationHistory
  );
  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  const handleLocationClick = useCallback(
    (targetLocation) => {
      mapUtils.flyTo(map, {
        center: targetLocation?.geometry?.location,
        zoom: 17,
      });
      dispatch(setSelectedLocation(targetLocation));
    },
    [map]
  );

  if (!locationHistory.length) {
    return;
  }

  const renderHistoricalLocation = (location) => {
    return (
      <ListItemWrapper
        key={location.place_id}
        onClick={() => handleLocationClick(location)}
        isSelected={location?.place_id === selectedLocation?.place_id}
      >
        <MapPinIconContainer>
          <MapPinIcon />
        </MapPinIconContainer>
        <TextContainer>
          <MainText>{location.structured_formatting.main_text}</MainText>
          <SecondaryText>
            {location.structured_formatting.secondary_text}
          </SecondaryText>
        </TextContainer>
      </ListItemWrapper>
    );
  };

  return (
    <StyledListContainer>
      {locationHistory.map((location) => renderHistoricalLocation(location))}
    </StyledListContainer>
  );
};

export default LocationHistory;
