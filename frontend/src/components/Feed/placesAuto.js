import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Button from "@material-ui/core/Button";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function PlacesAuto(props) {
  const [address, setAddress] = React.useState("");
  const [locations, setLocations] = React.useState([{}]);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  // useEffect(() => {
  //   axios
  //     .post(backendServer + "/getLocations")
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         setLocations(response.data);

  //       }
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleOnClick = () => {
    window.alert(props.details.id);
  };

  return (
    <div>
      {locations ? (
        (locations.map = (location) => {
          <div>
            {location.name} saw the pet in {location.location} on{" "}
            {location.Date}.
          </div>;
        })
      ) : (
        <div>No recent sightings of the pet..!</div>
      )}
      <table>
        <tr>
          <td>
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
                  {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}

                  <input
                    {...getInputProps({ placeholder: "Type address" })}
                    style={{
                      width: "400px",
                      height: "35px",
                      borderRadius: "12px",
                    }}
                  />

                  <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#8dc63f"
                          : "#85a1b4",
                      };

                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </td>
          <td>
            <Button
              variant="contained"
              onClick={handleOnClick}
              style={{
                width: "150%",
                height: "55px",
                marginLeft: "10px",
                borderRadius: "13px",

                backgroundColor: "#8dc63f",
              }}
            >
              Post Sighting
            </Button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDKT5mLiGAU26aO5yCoHbQwHVOX2W5JHp0",
})(PlacesAuto);
