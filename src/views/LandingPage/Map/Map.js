import React from "react";

import Map from "./MapWrapper";

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      lat: "",
      lng: "",
    };

    this.onMapReady = this.onMapReady.bind(this);
    this.centerMe = this.centerMe.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    this.onMapReady();
  }

  centerMe(position) {
    this.setState({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
    console.log("position", position);
  }

  onMapReady() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.centerMe);
      console.log("here");
    } else {
    }
  }

  onHide(event) {
    this.props.onCloseModalMap(false);
  }

  apiError(err) {}

  updateLocation(newLat, newLng) {
    this.setState({
      lat: newLat,
      lng: newLng,
    });
    this.props.changelatlong(newLat, newLng);
    console.log(newLat, newLng);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.center != null && (
          <Map
            google={this.props.google}
            center={
              this.props.lat != "" && this.props.lng != ""
                ? {
                    lat: parseFloat(this.props.lat),
                    lng: parseFloat(this.props.lng),
                  }
                : this.state.center
            }
            height="580px"
            zoom={13}
            updateLocation={this.updateLocation}
          />
        )}
      </React.Fragment>
    );
  }
}
