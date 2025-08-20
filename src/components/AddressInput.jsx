import { useState, useEffect, useCallback, useRef } from "react";
import { TextField } from "@components/base";
import styled from "styled-components";
import {
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "@utils/timingUtils";

const Container = styled.div`
  position: relative;
  width: 100%;
`;
const StyledList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff; /* Give it a solid background */
  list-style: none;
  padding: 0;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
`;

const ListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const IconContainer = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  flex-shrink: 0;
  margin-right: 16px;
  color: #666; /* This color will be inherited by the SVG icon */
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
  color: #666; /* Icon color */

  &:hover {
    color: #333; /* Darker color on hover */
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
  color: #212121;
`;

const SecondaryText = styled.div`
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddressInput = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const searchBlockRef = useRef(false);

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

  useEffect(() => {
    if (searchBlockRef.current) {
      searchBlockRef.current = false;
      return;
    }
    fetchPredictions(value);
    setShowOptions(true);
  }, [value]);

  const handleOptionClick = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.id;
      if (!id) return;

      const selectedOption = options.find((opt) => opt.place_id === id);

      if (selectedOption) {
        searchBlockRef.current = true;
        setValue(selectedOption.description);
        setOptions([]);
        setShowOptions(false);
      }
    },
    [options]
  );

  const handleToggleShowCollapse = () => setShowOptions((prev) => !prev);

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
        <IconContainer>
          <MapPinIcon />
        </IconContainer>
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
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      {showOptions && options.length > 0 && (
        <StyledList>{options.map((option) => renderOption(option))}</StyledList>
      )}
      <StyledIconButton onClick={handleToggleShowCollapse}>
        {showOptions ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </StyledIconButton>
    </Container>
  );
};
export default AddressInput;
