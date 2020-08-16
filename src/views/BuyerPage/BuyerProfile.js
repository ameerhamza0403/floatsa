import React from "react";
import { Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Rowing";
import Palette from "@material-ui/icons/History";
import Payment from "@material-ui/icons/Payment";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Chip from "@material-ui/core/Chip";
// import profile from "assets/img/faces/christian.jpg";

// import studio1 from "assets/img/examples/studio-1.jpg";
// import studio2 from "assets/img/examples/studio-2.jpg";
// import studio3 from "assets/img/examples/studio-3.jpg";
// import studio4 from "assets/img/examples/studio-4.jpg";
// import studio5 from "assets/img/examples/studio-5.jpg";
// import work1 from "assets/img/examples/olu-eletu.jpg";
// import work2 from "assets/img/examples/clem-onojeghuo.jpg";
// import work3 from "assets/img/examples/cynthia-del-rio.jpg";
// import work4 from "assets/img/examples/mariya-georgieva.jpg";
// import work5 from "assets/img/examples/clem-onojegaw.jpg";
import Backdrop from "components/Backdrop/Backdrop.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import * as firebase from "firebase";
import { firebaseConfig } from "variables/constants";
import Dialog from "components/Dialog/Dialog";
import VesselDetails from "./vesseldetails";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [userDetail, setUserDetail] = React.useState({});
  const [load, setLoad] = React.useState(false);
  const [keysofUser, setKeysofUser] = React.useState([]);
  const [driver, setDriver] = React.useState([]);
  const [vessels, setVessels] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    getuserDetail();
    setTimeout(() => {
      getRoute();
    }, 300);
  }, []);

  const getuserDetail = async () => {
    setLoad(true);
    const user = await JSON.parse(localStorage.getItem("@user"));
    if (user != null) {
      setKeysofUser(Object.values(user));
    }
    setUserDetail(user);
    // setLoad(false);
  };

  const getRoute = async () => {
    setLoad(true);
    const search = props.history.location.search.split("=")[1];
    if (search == undefined) {
      setDriver(null);
    } else {
      const sailor = await firebase
        .firestore()
        .collection("Sailor")
        // .doc(search)
        .where("userId", "==", search)
        .get();
      let driverInfo = "";
      sailor.forEach((e) => {
        driverInfo = e.data();
      });
      if (driverInfo.userId) {
        const boat = await firebase
          .firestore()
          .collection("Vessel")
          .where("userId", "==", driverInfo.userId)
          .get();
        let arr = [];
        boat.forEach((e) => arr.push(e.data()));
        setVessels(arr);
        setDriver(driverInfo);
        setLoad(false);
        console.log(driverInfo, arr);
      } else {
        setDriver(null);
      }
    }
  };

  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  if (userDetail == null) {
    return <Redirect to="/login" />;
  }
  if (driver == null) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <Backdrop open={load} />
      <Dialog
        title="Vessels Details"
        body={<VesselDetails {...{ vessels }} />}
        okText={"Ok"}
        cancelText="Back"
        size="md"
        open={openDialog}
        handleCancel={() => setOpenDialog(false)}
        handleOk={() => setOpenDialog(false)}
      />
      <Header
        color="white"
        brand="FLOATSTA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={
          // driver.image ||
          "https://images.unsplash.com/photo-1534342357876-491359270a66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        }
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={
                        driver.image ||
                        "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                      }
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{driver.name || ''}</h3>
                    <h6>CONTACT INFORMATION</h6>
                    {/* <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button> */}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {driver.name && (
              <div
                className={classes.description}
                style={{
                  paddingBottom: 20,
                }}
              >
                <p>{driver.about}</p>
                {/* {keysofUser.map((e) => {
                if (typeof e == "string") {
                  return <Chip label={e} />;
                }
              })} */}
                <Chip label={driver.phone} /> &nbsp;
                <Chip label={driver.email} />
                <table className="table table-hover mt-4 mb-4">
                  <tbody>
                    <tr>
                      <td>Police Clearance</td>
                      <td>{driver.police.length > 0 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Yellow Card</td>
                      <td>{driver.yellowcard.length > 0 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Blue Card</td>
                      <td>{driver.bluecard.length > 0 ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td>{driver.facebook}</td>
                    </tr>
                    <tr>
                      <td>Mobile</td>
                      <td>{driver.mobile}</td>
                    </tr>
                    <tr>
                      <td>Skipper</td>
                      <td>{driver.skipper}</td>
                    </tr>
                    <tr>
                      <td>Registered Vessels</td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (vessels.length > 0) {
                            setOpenDialog(true);
                          }
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "purple",
                            padding: 10,
                            borderRadius: 5,
                            color: "white",
                          }}
                        >
                          {`${vessels.length} ${
                            vessels.length > 0 ? "(view)" : ""
                          }`}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
