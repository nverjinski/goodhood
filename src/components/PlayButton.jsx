import styled from "styled-components";
import { useMap } from "@vis.gl/react-google-maps";
import mapUtils from "@utils/mapUtils";
import { PlayIcon } from "@heroicons/react/24/solid";

const StyledButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: background-color 300ms, color 300ms;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.secondary_base};
  color: ${({ theme }) => theme.secondary_text};

  &:hover {
    background-color: ${({ theme }) => theme.secondary_text};
    color: ${({ theme }) => theme.secondary_base};
  }

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
`;

const PlayButton = () => {
  const map = useMap();

  const handleClick = () => {
    // Test map flyTo function and API call
    if (map) {
      const newLocation = { lat: 40.7128, lng: -74.006 }; // Example: New York City
      mapUtils.flyTo(map, { center: newLocation, zoom: 17 });
    }
  };

  return (
    <StyledButton onClick={handleClick} aria-label="Play Button">
      <IconWrapper>
        <PlayIcon />
      </IconWrapper>
    </StyledButton>
  );
};

export default PlayButton;
