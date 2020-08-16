import React, { Component } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CancelIcon from "@material-ui/icons/Cancel";

export default class Vessel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vesselImage: 0,
      vesselNumber: 0,
    };
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div
            className="row rounded p-1"
            style={{ backgroundColor: "#efeded" }}
          >
            <div className="col text-center">
              <ArrowBackIcon
                onClick={() => {
                  if (this.state.vesselNumber > 0)
                    this.setState({
                      vesselNumber: this.state.vesselNumber - 1,
                      vesselImage: 0,
                    });
                }}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: 5,
                }}
              />
              {"   "}Previous Vessel
            </div>
            <div className="col text-center">
              Next Vessel {"  "}
              <ArrowForwardIcon
                onClick={() => {
                  if (this.state.vesselNumber < this.props.vessels.length - 1)
                    this.setState({
                      vesselNumber: this.state.vesselNumber + 1,
                      vesselImage: 0,
                    });
                }}
                style={{
                  backgroundColor: "blue",
                  borderRadius: 5,
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          <div
            className="row mb-3 mt-3"
            style={{ justifyContent: "center", height: "300px" }}
          >
            {
              <img
                src={
                  this.props.vessels[this.state.vesselNumber].images[
                    this.state.vesselImage
                  ]
                }
                width="300px"
                height="100%"
              />
            }
          </div>
          <div className="row pl-4 pr-4 ml-4 mr-4">
            <div className="col text-center">
              <ArrowBackIcon
                onClick={() => {
                  if (this.state.vesselImage > 0)
                    this.setState({
                      vesselImage: this.state.vesselImage - 1,
                    });
                }}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              />
              {"   "}Previous Image
            </div>
            <div className="col text-center">
              Next Image {"  "}
              <ArrowForwardIcon
                onClick={() => {
                  if (
                    this.state.vesselImage <
                    this.props.vessels[this.state.vesselNumber].images.length -
                      1
                  )
                    this.setState({
                      vesselImage: this.state.vesselImage + 1,
                    });
                }}
                style={{
                  backgroundColor: "green",
                  borderRadius: 5,
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
          <p className='p-5 text-center'>{this.props.vessels[this.state.vesselNumber].aboutbio}</p>
          <table className="table table-hover mt-4 mb-4">
            <tbody>
              <tr>
                <td>Number of Berths</td>
                <td>
                  {this.props.vessels[this.state.vesselNumber].numOfBerths}
                </td>
              </tr>
              <tr>
                <td>Maximum Passangers</td>
                <td>
                  {this.props.vessels[this.state.vesselNumber].maxpassengers}
                </td>
              </tr>
              <tr>
                <td >Marine Radio</td>
                <td>
                  {this.props.vessels[this.state.vesselNumber].marinRadio ==
                  true ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <CancelIcon style={{ color: "red" }} />
                  )}
                </td>
              </tr>
            
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
