import React, { Component } from "react";
import paypal from "paypal-rest-sdk";
import PaypalComponent from "./paypal";
import * as firebase from "firebase";

const SANDBOX_CLIENT_ID =
  "Aeg3WWKmVjMwfGK2pdyeP-a47jzKDYA-4yN34bRvZvPhXd6SO2hga4qFskcGCuV-mK5LsAf_fKYFTQ5-";
const SANDBOX_SECRET =
  "ECKJJVKOqoTCTjlwMCPg-sqFc2OZuV3iOr_HhuoH4lwSK3l7R3i2mk9BLqZoeBVtDBUv765nCxQEJYAu";

export default class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${SANDBOX_CLIENT_ID}&currency=AUD`;
    // script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);

    paypal.configure({
      mode: "sandbox", // sandbox or live
      client_id: SANDBOX_CLIENT_ID,
      client_secret: SANDBOX_SECRET,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className=" text-center justify-content-center"
          style={{
            padding: 50,
            maxWidth: 500,
            borderRadius: 5,
            border: "1px solid #ededed",
            backgroundColor: "#ededed",
          }}
        >
          <div className="row text-center justify-content-center pb-3">
            <span
              className=" text-primary"
              style={{
                //   fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Current Balance:{" "}
            </span>
            <span
              className="text-warning"
              style={{
                //   fontSize: 20,
                fontWeight: "bold",
              }}
            >
              AUD {`  ${this.props.userDetail.funds || "0"}`}
            </span>
          </div>
          <div className="row">
            {/* <label for="exampleInputEmail1">CardHolder Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="row">
            <label for="exampleInputEmail1">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="row">
            <div className="col-4">
              <label for="exampleInputEmail1">Expiry Month</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="col-4">
              <label for="exampleInputEmail1">Expiry Year</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div> */}
            <div>
              <label for="exampleInputEmail1">Enter Amount</label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                type='number'
                aria-describedby="emailHelp"
                value={this.state.amount}
                onChange={(e) => this.setState({ amount: e.target.value })}
              />
            </div>
          </div>
          <div className="row text-center justify-content-center pt-3">
            {this.state.amount.length > 0 && (
              <PaypalComponent
                paypal={window.paypal}
                placeOrder={async () => {
                  await firebase
                    .firestore()
                    .collection("Users")
                    .doc(this.props.userDetail.id)
                    .update({
                      funds:
                      parseFloat(this.props.userDetail.funds)+
                         parseFloat(this.state.amount),
                    });
                  const data = await firebase
                    .firestore()
                    .collection("Users")
                    .doc(this.props.userDetail.id)
                    .get();
                  await localStorage.setItem(
                    "@user",
                    JSON.stringify(data.data())
                  );
                  alert("Success");
                }}
                amount={this.state.amount}
              />
            )}
            {/* <span
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: "purple",
                color: "white",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Pay
            </span> */}
          </div>
          <small>Add Balance to your Account</small>
        </div>
      </React.Fragment>
    );
  }
}
