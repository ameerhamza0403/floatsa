import React, { Component } from "react";
import * as firebase from "firebase";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Dialog from "components/Dialog/Dialog";
import TripDetails from "./tripDetails";
import { Link, Redirect } from "react-router-dom";
import Backdrop from "components/Backdrop/Backdrop.js";
import { createTrue } from "typescript";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default class Ongoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ongoingRide: [],
      selectedRide: {},
      modalOpen: false,
      load: false,
      modalOpenComplete: false,
      cost: 0,
      cash: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getTrips();
    }, 300);
  }

  getTrips = async () => {
    const data = await firebase
      .firestore()
      .collection("trips")
      .where(
        "status",
        "==",
        this.props.status == "complete"
          ? "completed"
          : this.props.status
          ? "assigned"
          : "live"
      )
      .get();
    let rides = [];
    if (
      this.props.status &&
      this.props.userDetail.userType == "seller" &&
      this.props.status != "complete"
    ) {
      data.forEach((e) => {
        if (
          e.data().operator != undefined &&
          e.data().operator.id == this.props.userDetail.id
        ) {
          rides.push(e.data());
        }
      });
    } else {
      data.forEach((e) => {
        rides.push(e.data());
      });
    }
    this.setState({
      ongoingRide: rides,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Backdrop open={this.state.load} />
        <Dialog
          title="Trip Details"
          body={<TripDetails trip={this.state.selectedRide} />}
          okText={
            !this.props.status &&
            this.props.userDetail.userType == "seller" &&
            this.props.status != "complete"
              ? "ACCEPT OFFER"
              : "Ok"
          }
          cancelText="BACK"
          size="md"
          open={this.state.modalOpen}
          handleCancel={() => this.setState({ modalOpen: false })}
          handleOk={async () => {
            if (
              !this.props.status &&
              this.props.userDetail.userType == "seller" &&
              this.props.status != "complete"
            ) {
              this.setState({ load: true });
              await firebase
                .firestore()
                .collection("trips")
                .doc(this.state.selectedRide.id)
                .update({
                  operator: {
                    id: this.props.userDetail.id,
                    name: this.props.userDetail.name,
                  },
                  status: "assigned",
                });
              this.setState({ modalOpen: false, load: false });
            } else {
              this.setState({ load: false, modalOpen: false });
            }
          }}
        />
        <Dialog
          title="Payment Details"
          body={
            <React.Fragment>
              <div className="p-4">
                <label for="exampleInputEmail1">Enter Amount</label>
                <input
                  className="form-control"
                  id="exampleInputEmail1"
                  type="number"
                  aria-describedby="emailHelp"
                  value={this.state.amount}
                  onChange={(e) => this.setState({ cost: e.target.value })}
                />
              </div>
              <div className="p-4">
                <input
                  type="checkbox"
                  value={this.state.cash}
                  onClick={(e) => {
                    this.setState({ cash: e.target.checked });
                  }}
                  aria-label="Checkbox for following text input"
                />
                &nbsp;
                <label>
                  Cash Payment (if not selected wallet funds will be used){" "}
                </label>
              </div>
            </React.Fragment>
          }
          okText={"Mark Complete"}
          cancelText="BACK"
          size="md"
          open={this.state.modalOpenComplete}
          handleCancel={() => this.setState({ modalOpenComplete: false })}
          handleOk={async () => {
            const userget = await firebase
              .firestore()
              .collection("Users")
              .doc(this.state.selectedRide.userId)
              .get();
            let user = userget.data();

            const fundsget = await firebase
              .firestore()
              .collection("funds")
              .doc(this.state.selectedRide.operator.id)
              .get();
            let funds = fundsget.data();

            if (this.state.cash) {
              this.setState({ load: true });
              await firebase
                .firestore()
                .collection("trips")
                .doc(this.state.selectedRide.id)
                .update({
                  cost: this.state.cost,
                  status: "completed",
                  paidThru: "cash",
                });

              await firebase
                .firestore()
                .collection("funds")
                .doc(this.state.selectedRide.operator.id)
                .update({
                  total: funds.total + this.state.cost,
                  monthly: funds.monthly + this.state.cost,
                  cash: funds.cash + this.state.cost,
                });
              this.setState({ load: false, modalOpenComplete: false });
            } else {
              if (user.funds > this.state.cost) {
                this.setState({ load: true });
                await firebase
                  .firestore()
                  .collection("trips")
                  .doc(this.state.selectedRide.id)
                  .update({
                    cost: this.state.cost,
                    status: "completed",
                    paidThru: "wallet",
                  });

                await firebase
                  .firestore()
                  .collection("Users")
                  .doc(this.state.selectedRide.userId)
                  .update({
                    funds: user.funds - this.state.cost,
                  });
                await firebase
                  .firestore()
                  .collection("funds")
                  .doc(this.state.selectedRide.operator.id)
                  .update({
                    total: funds.total + this.state.cost,
                    monthly: funds.monthly + this.state.cost,
                    cashwithCompany: funds.cashwithCompany + this.state.cost,
                  });
                this.setState({ load: false, modalOpenComplete: false });
              } else {
                alert("Funds are not enough, Please use cash");
              }
            }
          }}
        />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
              {/* {this.props.status == true && <th scope="col"></th>} */}
              {this.props.userDetail.userType == "buyer" && (
                <th scope="col">Operator/Skipper</th>
              )}
              <th scope="col">Place</th>
              <th scope="col">Cost</th>
              <th scope="col">Total Passengers</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ongoingRide.map((e, i) => {
              return (
                <tr>
                  <td>
                    {this.props.status == true && (
                      <CheckCircleIcon
                        style={{ color: "blue", cursor: "pointer", padding: 1 }}
                        onClick={() => {
                          this.setState({
                            modalOpenComplete: true,
                            selectedRide: e,
                          });
                        }}
                      />
                    )}
                  </td>
                  {
                    <td>
                      {
                        <VisibilityIcon
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            padding: 1,
                          }}
                          onClick={() => {
                            this.setState({
                              modalOpen: true,
                              selectedRide: e,
                            });
                          }}
                        />
                      }
                    </td>
                  }
                  {this.props.userDetail.userType == "buyer" && (
                    <React.Fragment>
                      {this.props.status ? (
                        <td>
                          <Link
                            to={`/driver/?id=${
                              e.operator == undefined ? "" : e.operator.id
                            }`}
                          >
                            {e.operator == undefined ? "" : e.operator.name}
                          </Link>
                        </td>
                      ) : (
                        <td>{e.operator || "not Assigned"}</td>
                      )}
                    </React.Fragment>
                  )}
                  <td>{`${e.location || ""}`}</td>
                  <td>{e.cost || "Not Confirmed"}</td>
                  <td>{e.vacancy}</td>
                  <td>{`${e.date.toDate()}`}</td>
                  <td>{e.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
