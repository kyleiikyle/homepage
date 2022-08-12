import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const masterKey = process.env.REACT_APP_MASTER_KEY;
const apiURL = process.env.REACT_APP_API_URL;
const userToken = localStorage.getItem("token");

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rows: [],
      activeMarker: {},
      selectedPlace: {},
    };
  }

  componentDidMount() {
    fetch(`${apiURL}activities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rows: result.rows,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { rows } = this.state;
    return (
      <ul>
        <div style={{ height: "74vh" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={{ lat: 54.33201, lng: -6.28533 }}
            defaultZoom={13}
          >
            {rows.map((row) => (
              <Marker
                key={row.id}
                lat={row.lat}
                lng={row.lng}
                name={row.name}
              />
            ))}
          </GoogleMapReact>
        </div>
      </ul>
    );
  }
}

export default Map;
