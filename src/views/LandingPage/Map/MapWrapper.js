import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { GOOGLE_API_KEY } from "../../../variables/constants";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

Geocode.setApiKey(GOOGLE_API_KEY);
//Geocode.enableDebug();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        ////console.log('-------current address---------')
        ////console.log( 'city', city, area, state );
        this.props.updateLocation(
          this.state.mapPosition.lat,
          this.state.mapPosition.lng
        );

        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
      },
      (error) => {
        ////console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    ////console.log('-------getCity--------');
    ////console.log(addressArray);
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    ////console.log('-------getArea--------');
    ////console.log(addressArray);
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onMapClick = (event) => {
    this.onMarkerDragEnd(event);
  };

  onPlaceSelected = (place) => {
    console.log(place);

    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.props.updateLocation(latValue, lngValue);
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    ////console.log( 'event', event );
    ////console.log( event.latLng.lat(), event.latLng.lng() );

    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        this.props.updateLocation(newLat, newLng);

        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        ////console.error(error);
      }
    );
  };

  render() {
    let googleUrl =
      "https://maps.googleapis.com/maps/api/js?key=" +
      GOOGLE_API_KEY +
      "&libraries=places";

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          onClick={this.onMapClick}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Autocomplete
            style={{
              width: "300px",
              position: "absolute",
              top: "2%",
              right: "25%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "10px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={[]}
          />

          {/* <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.01,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow> */}

          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            icon={{
              url:
                "https://cdn1.iconfinder.com/data/icons/virus-covid-19-coronavirus-antivirus-around-worl-1/130/corona-virus-11-512.png",
              // size: { width: 2, height: 2 },
              scaledSize: { width: 64, height: 64 },
            }}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />

          {[9, 7, 13, 4, 12, 10, 17].map((e, i) => (
            <Marker
              google={this.props.google}
              name={"Dolores park"}
              draggable={false}
              // onDragEnd={this.onMarkerDragEnd}
              icon={{
                url:
                  "https://cdn3.iconfinder.com/data/icons/travel-43/512/solid-travel-tourism-boat-512.png",
                // size: { width: 2, height: 2 },
                scaledSize: { width: 34, height: 34 },
              }}
              position={{
                lat: this.state.markerPosition.lat + (e *  ((parseInt(Math.random() * (8 - 1) + 0) / 10))) /
                100,
                lng:
                  this.state.markerPosition.lng +
                  (e *
                    (i > (parseInt(Math.random() * (4 - 1) + 0))
                      ? 0.5
                      : -2 * (parseInt(Math.random() * (6 - 0) + 0) / 10))) /
                    100,
              }}
            />
          ))}
        </GoogleMap>
      ))
    );
    let map;

    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div></div>
          <AsyncMap
            googleMapURL={googleUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: "580px", margin: "auto" }}></div>;
    }
    return map;
  }
}
export default Map;
