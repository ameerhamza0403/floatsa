import React, { Component } from "react";

export default class Vessel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(JSON.stringify(this.props.trip.selectedStartRetTime.toDate()));
    return (
      <React.Fragment>
        <div className="container">
          <table className="table table-hover mt-4 mb-4">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.props.trip.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.props.trip.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{this.props.trip.phone}</td>
              </tr>
              <tr>
                <td>Passangers</td>
                <td>{this.props.trip.vacancy}</td>
              </tr>
              <tr>
                <td>Drive</td>
                <td>{this.props.trip.drive}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{this.props.trip.location}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{this.props.trip.status}</td>
              </tr>
              <tr>
                <td>Equipment</td>
                <td>
                  <span>{this.props.trip.equipment.map((e) => `${e},  `)}</span>
                </td>
              </tr>
              <tr>
                <td>Intent</td>
                <td>
                  <span>{this.props.trip.intent.map((e) => `${e}, `)}</span>
                </td>
              </tr>
              <tr>
                <td>Food</td>
                <td>
                  <span>{this.props.trip.food.map((e) => `${e}, `)}</span>
                </td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedStartDate.toDate()
                    ).split("T")[0]
                  }"`}</span>
                </td>
              </tr>{" "}
              <tr>
                <td>End Date</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedEndDate.toDate()
                    ).split("T")[0]
                  }"`}</span>
                </td>
              </tr>
              <tr>
                <td>Start Departure Time</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedEndDepTime.toDate()
                    ).split("T")[1].split('.')[0]
                  }`}</span>
                </td>
              </tr>
              <tr>
                <td>End Depearture Time</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedEndRetTime.toDate()
                    ).split("T")[1].split('.')[0]
                  }`}</span>
                </td>
              </tr>
              <tr>
                <td>Start Return Time</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedStartDepTime.toDate()
                    ).split("T")[1].split('.')[0]
                  }`}</span>
                </td>
              </tr>
              <tr>
                <td>End Return Time</td>
                <td>
                  <span>{`${
                    JSON.stringify(
                      this.props.trip.selectedStartRetTime.toDate()
                    ).split("T")[1].split('.')[0]
                  }`}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
