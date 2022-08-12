import React, { useState } from "react";
import "./organise.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Swal from "sweetalert2";

const masterKey = process.env.REACT_APP_MASTER_KEY;
const apiURL = process.env.REACT_APP_API_URL;
const userID = localStorage.getItem("id");
const userToken = localStorage.getItem("token");

const Organise = () => {
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [sport, setSport] = React.useState("");

  const handleChanges = (event) => {
    setSport(event.target.value);
  };

  const [gender, setGender] = React.useState("");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
  };

  const handleChangesg = (event) => {
    setGender(event.target.value);
  };

  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  function createEvent() {
    const price = document.getElementById("activityPrice").value;
    const size = document.getElementById("activityMaxSize").value;
    const desc = document.getElementById("activityDescription").value;
    const title = document.getElementById("activityTitle").value;
    const userToken = localStorage.getItem("token");

    const eventData = {
      access_token: userToken,
      price: price,
      activity: sport,
      lat: coordinates.lat,
      lng: coordinates.lng,
      gender: gender,
      size: size,
      desc: desc,
      name: title,
      date: value.toLocalString(undefined, options),
    };

    const myEvent = {
      date: value.toLocaleString(undefined, options),
      access_token: userToken,
    };

    fetch(`${apiURL}activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((response) => response.json())
      // Then with the data from the response in JSON.
      .then((data) => {
        if (data.valid === false) {
          Swal.fire({
            title: "Error!",
            text: "An error occured please try again",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Success!",
            text: "Activity Created Successfully",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
          });
          fetch(`${apiURL}users/myactivities/${userID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: userToken,
              myactivities:
                title + " " + value.toLocaleString(undefined, options),
            }),
          });
        }
      });
  }

  return (
    <div className="organise-background">
      <div className="container">
        <div className="row align-items-center">
          <div className="organise-wrapper">
            <div className="organise-body">
              <div className="organise-title">
                <h1 className="organise-header">Organise</h1>
                <h1 className="organise-subHeader">
                  Get your activity up and running below
                </h1>
              </div>

              <form id="ActivityForm" action="index.html">
                <div className="activity-title">
                  <Box sx={{ width: 1, p: 1 }}>
                    <label for="activityTitle"></label>
                    <input
                      className="form-control-organise"
                      id="activityTitle"
                      type="title"
                      placeholder="Activity Title"
                      required
                    />
                  </Box>
                </div>

                <div className="activity-type">
                  <Box sx={{ width: 1, p: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id="activityType">Sport</InputLabel>
                      <Select
                        id="activityType"
                        style={{
                          backgroundColor: "white",
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                        labelId="demo-simple-select-label"
                        value={sport}
                        label="Sport"
                        onChange={handleChanges}
                        align="center"
                      >
                        <MenuItem value={"American Football"}>
                          American Football
                        </MenuItem>
                        <MenuItem value={"Athletics"}>Athletics</MenuItem>
                        <MenuItem value={"Badminton"}>Badminton</MenuItem>
                        <MenuItem value={"Basketball"}>Basketball</MenuItem>
                        <MenuItem value={"Cricket"}>Cricket</MenuItem>
                        <MenuItem value={"Cycling"}>Cycling</MenuItem>
                        <MenuItem value={"Football"}>Football</MenuItem>
                        <MenuItem value={"Gaelic"}>Gaelic</MenuItem>
                        <MenuItem value={"Gym"}>Gym</MenuItem>
                        <MenuItem value={"Golf"}>Golf</MenuItem>
                        <MenuItem value={"Gymnastics"}>Gymnastics</MenuItem>
                        <MenuItem value={"Hiking"}>Hiking</MenuItem>
                        <MenuItem value={"MMA"}>MMA</MenuItem>
                        <MenuItem value={"Netball"}>Netball</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                        <MenuItem value={"Rugby"}>Rugby</MenuItem>
                        <MenuItem value={"Running"}>Running</MenuItem>
                        <MenuItem value={"Table Tennis"}>Table Tennis</MenuItem>
                        <MenuItem value={"Tennis"}>Tennis</MenuItem>
                        <MenuItem value={"Volleyball"}>Volleyball</MenuItem>
                        <MenuItem value={"Walking"}>Walking</MenuItem>
                        <MenuItem value={"Water Sports"}>Water Sports</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <Box sx={{ width: 1, p: 1 }}>
                  <FormControl
                    style={{ backgroundColor: "white", fontSize: "15px" }}
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        disablePast={true}
                        showToolbar={true}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>

                <div className="activity-location">
                  <Box sx={{ width: 1, p: 1 }}>
                    <FormControl fullWidth style={{ fontSize: "15px" }}>
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div>
                            <input
                              {...getInputProps({
                                placeholder: "Type Address",
                              })}
                            />

                            <div>
                              {loading ? <div>...loading</div> : null}

                              {suggestions.map((suggestion) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#41b6e6"
                                    : "#fff",
                                };

                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </FormControl>
                  </Box>
                </div>

                <div className="activity-gender">
                  <Box sx={{ width: 1, p: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id="activityType">Gender</InputLabel>
                      <Select
                        style={{
                          backgroundColor: "white",
                          textAlign: "left",
                          fontSize: "15px",
                        }}
                        value={gender}
                        label="Gender"
                        onChange={handleChangesg}
                        id="activityGender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Mixed"}>Mixed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>

                <div className="activity-price">
                  <Box sx={{ width: 1, p: 1 }}>
                    <input
                      className="form-control-organise"
                      id="activityPrice"
                      type="number"
                      placeholder="Individual Price (£)"
                      required
                      prefix={"hello"}
                    />
                  </Box>
                </div>

                <div className="activity-size">
                  <Box sx={{ width: 1, p: 1 }}>
                    <input
                      className="form-control-organise"
                      id="activityMaxSize"
                      type="size"
                      placeholder="Max Capacity"
                      required
                    />
                  </Box>
                </div>

                <div className="activity-description">
                  <Box sx={{ width: 1, p: 1 }}>
                    <textarea
                      className="form-control-organise"
                      id="activityDescription"
                      type="description"
                      placeholder="Activity Description"
                      rows="3"
                    />
                  </Box>
                </div>

                <div className="buttonActivitySubmit">
                  <button
                    className="button btnActSubmit"
                    onClick={() => {
                      createEvent();
                    }}
                    type="button"
                    name="btnActSubmit"
                  >
                    Create Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organise;
