import { useState, useEffect, useCallback, useRef } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// The custom useTheme hook is no longer needed as MUI components access the theme contextually.
import { useTheme } from "@contexts/ThemeContext";

// --- Main Component ---

const Address = () => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const debounceTimer = useRef();

  const theme = useTheme();

  const fetchPredictions = useCallback((input) => {
    fetch(`/api/google-places?input=${input}`)
      .then((res) => res.json())
      .then((data) => {
        setOptions(data?.predictions || []);
      })
      .catch((error) => {
        console.error("Error fetching address predictions:", error);
        setOptions([]);
      });
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchPredictions(inputValue);
    }, 400);
    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [value, inputValue, fetchPredictions]);

  return (
    <Autocomplete
      id="google-maps-autocomplete"
      sx={{ width: 450 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Address" fullWidth sx={{}} />
      )}
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        const { structured_formatting } = option || {};
        const mainText = structured_formatting?.main_text || "";
        const secondaryText = structured_formatting?.secondary_text || "";

        return (
          <li key={key} {...restProps}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                <Box component="span">{mainText}</Box>
                <Typography variant="body2" color="text.secondary">
                  {secondaryText}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default Address;
