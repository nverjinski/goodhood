import { useState, useEffect, useCallback, useRef } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useDispatch } from "react-redux";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { TextField } from "@components/base";
import styled from "styled-components";
import mapUtils from "@utils/mapUtils";
import { debounce } from "@utils/timingUtils";
import { addLocationHistory, setSelectedLocation } from "../app/locationSlice";

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const StyledList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.primary_base};
  list-style: none;
  padding: 0;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.heavy_line_outline};
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  z-index: 10;

  &:hover {
    background-color: ${({ theme }) => theme.primary_base};
  }
`;

const ListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;

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

const AddressInput = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchBlockRef = useRef(false);
  const map = useMap();
  const dispatch = useDispatch();

  const displayOptions = options.length > 0 && isInputFocused;

  const fetchPredictions = useCallback(
    debounce((input) => {
      if (!input) {
        setOptions([]);
        return;
      }
      fetch(`/api/google-places?input=${input}`)
        .then((res) => res.json())
        .then((data) => {
          setOptions(data?.predictions || []);
        })
        .catch((error) => {
          console.error("Error fetching address predictions:", error);
          setOptions([]);
        });
    }, 400),
    []
  );

  const fetchGeocoding = useCallback((input) => {
    if (!input) {
      return;
    }
    return fetch(`/api/google-geocoding?input=${input}`)
      .then((res) => res.json())
      .then((data) => {
        return data?.results?.[0];
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchBlockRef.current) {
      searchBlockRef.current = false;
      return;
    }
    fetchPredictions(value);
  }, [value]);

  const handleOptionClick = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.id;
      if (!id) return;

      const selectedOption = options.find((opt) => opt.place_id === id);

      if (selectedOption) {
        searchBlockRef.current = true;
        setValue("");
        setOptions([]);
        fetchGeocoding(selectedOption.place_id).then((targetLocation) => {
          mapUtils.flyTo(map, {
            center: targetLocation?.geometry?.location,
            zoom: 17,
          });
          const combinedLocationData = { ...targetLocation, ...selectedOption };
          dispatch(addLocationHistory(combinedLocationData));
          dispatch(setSelectedLocation(combinedLocationData));
        });
      }
    },
    [options, map]
  );

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  const handleClearClick = () => {
    setOptions([]);
    setValue("");
  };

  const renderOption = (option) => {
    const { structured_formatting } = option || {};
    const mainText = structured_formatting?.main_text || "";
    const secondaryText = structured_formatting?.secondary_text || "";

    return (
      <ListItemWrapper
        key={option.place_id}
        data-id={option.place_id}
        onClick={handleOptionClick}
      >
        <MapPinIconContainer>
          <MapPinIcon />
        </MapPinIconContainer>
        <TextContainer>
          <MainText>{mainText}</MainText>
          <SecondaryText>{secondaryText}</SecondaryText>
        </TextContainer>
      </ListItemWrapper>
    );
  };

  return (
    <Container>
      <TextField
        label="Search Address"
        id="address-input"
        value={value}
        onChange={handleInputChange}
        onFocusChange={setIsInputFocused}
      />
      {displayOptions && (
        <StyledList onMouseDown={(e) => e.preventDefault()}>
          {options.map((option) => renderOption(option))}
        </StyledList>
      )}
      {isInputFocused && value && (
        <StyledIconButton
          onClick={handleClearClick}
          onMouseDown={(e) => e.preventDefault()}
        >
          <XMarkIcon />
        </StyledIconButton>
      )}
    </Container>
  );
};
export default AddressInput;
