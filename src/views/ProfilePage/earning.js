import React, { Component } from "react";
import * as firebase from "firebase";

export default class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      earning: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getData();
    }, 300);
  }

  getData = async () => {
    const data = await firebase
      .firestore()
      .collection("funds")
      .doc(this.props.userDetail.id)
      .get();
    this.setState({
      earning: data.data(),
    });
  };

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
          {this.state.earning.total != undefined && (
            <React.Fragment>
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                Total Earning{" "}
              </span>
              <span
                style={{ fontWeight: "bold", color: "green", fontSize: 25 }}
              >
                {this.state.earning.total} AUD
              </span>
              <br />
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                This month Earning{" "}
              </span>
              <span
                style={{ fontWeight: "bold", color: "green", fontSize: 25 }}
              >
                {this.state.earning.monthly} AUD
              </span>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
