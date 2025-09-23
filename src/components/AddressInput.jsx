import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { useMap } from "@vis.gl/react-google-maps";
import { useDispatch } from "react-redux";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { TextField } from "@components/base";
import styled from "styled-components";
import mapUtils from "@utils/mapUtils";
import { debounce } from "@utils/timingUtils";
import { addLocationHistory, setSelectedLocation } from "@store/locationSlice";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: ${({ theme }) => theme.primary_base};
  list-style: none;
  padding: 0;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.heavy_line_outline};
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
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

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.secondary_text};
  animation: spin 0.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AddressInput = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const containerRef = useRef(null);
  const searchAddressRef = useRef(null);
  const searchBlockRef = useRef(false);
  const map = useMap();
  const dispatch = useDispatch();

  const showDropdown = isInputFocused && (isLoading || options.length > 0);

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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 300),
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
    if (value && !options.length) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    fetchPredictions(value);
  }, [value, fetchPredictions]);

  useLayoutEffect(() => {
    if (showDropdown && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [showDropdown]);

  const handleOptionClick = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.id;
      if (!id) return;

      const selectedOption = options.find((opt) => opt.place_id === id);

      if (selectedOption) {
        searchAddressRef.current?.blur();
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
    [options, map, searchAddressRef]
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
    <Container ref={containerRef}>
      <TextField
        label="Search Address"
        id="address-input"
        value={value}
        onChange={handleInputChange}
        onFocusChange={setIsInputFocused}
        ref={searchAddressRef}
      />
      {showDropdown &&
        createPortal(
          <StyledList
            onMouseDown={(e) => e.preventDefault()}
            style={dropdownPosition}
          >
            {isLoading ? (
              <LoadingSpinnerWrapper>
                <Spinner />
              </LoadingSpinnerWrapper>
            ) : (
              options.map((option) => renderOption(option))
            )}
          </StyledList>,
          document.body
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
