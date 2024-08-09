/* eslint-disable react/prop-types */
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocationData, setSearchTerm } from "../../app/userSlice";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const geocoder = { current: null }; // Geocoder 서비스 객체를 위한 ref

export default function GoogleMaps() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.user.searchTerm);

  const [value, setValue] = useState(searchTerm || null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps",
      );
    }
    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    if (searchTerm && geocoder.current) {
      // Google Maps Geocoder API를 사용하여 검색
      geocoder.current.geocode({ address: searchTerm }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const latitude = location.lat();
          const longitude = location.lng();

          console.log("Latitude:", latitude, "Longitude:", longitude);

          // Redux에 위도와 경도 저장
          dispatch(setLocationData({ latitude, longitude }));
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status,
          );
        }
      });
    }
  }, [searchTerm, dispatch]);

  // 사용자가 주소를 선택할 때 호출되는 함수
  const handleSelect = async newValue => {
    setValue(newValue);
    dispatch(setSearchTerm(newValue.description)); // Redux의 searchTerm 업데이트

    if (!geocoder.current && window.google) {
      geocoder.current = new window.google.maps.Geocoder();
    }

    // 선택한 주소의 위도와 경도 값을 가져오기
    geocoder.current.geocode(
      { address: newValue.description },
      (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          const latitude = location.lat();
          const longitude = location.lng();

          console.log("Latitude:", latitude, "Longitude:", longitude);

          // Redux에 위도와 경도 저장
          dispatch(setLocationData({ latitude, longitude }));
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status,
          );
        }
      },
    );
  };

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      getOptionLabel={option =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="건물명, 도로명, 지번으로 검색하세요."
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        if (newValue) {
          handleSelect(newValue); // 주소 선택 시 처리
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="건물명, 도로명, 지번으로 검색하세요."
          fullWidth
          sx={{
            borderRadius: "0",
            outline: 0,
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0,
              outline: 0,
            },
            "& .MuiInputBase-input": {
              border: 0,
              outline: 0,
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
