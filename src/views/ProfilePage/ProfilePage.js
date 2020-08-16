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
import PaymentComponent from "./Payments";
import OngoingProjects from "./ongoing";
import EarningComponent from "./earning";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [userDetail, setUserDetail] = React.useState({});
  const [load, setLoad] = React.useState(false);
  const [keysofUser, setKeysofUser] = React.useState([]);

  React.useEffect(() => {
    getuserDetail();
  }, []);

  const getuserDetail = async () => {
    setLoad(true);
    const user = await JSON.parse(localStorage.getItem("@user"));
    if (user != null) {
      setKeysofUser(Object.values(user));
    }
    setUserDetail(user);
    setLoad(false);
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
  return (
    <React.Fragment>
      <Backdrop open={load} />

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
                        "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
                      }
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userDetail.name}</h3>
                    <h6>YOUR INFORMATION</h6>
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
            <div className={classes.description}>
              {/* <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p> */}
              {/* {keysofUser.map((e) => {
                if (typeof e == "string") {
                  return <Chip label={e} />;
                }
              })} */}
              <Chip label={userDetail.email} /> &nbsp;
              <Chip label={userDetail.phone} />
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={
                    userDetail.userType == "buyer"
                      ? [
                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Available Rides"
                                : "Live Rides",
                            tabIcon: Camera,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="p-1 pt-4 pb-4"
                              >
                                <OngoingProjects
                                  userDetail={userDetail}
                                  status={false}
                                />
                              </GridContainer>
                            ),
                          },
                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Your Rides"
                                : "Assigned Rides",
                            tabIcon: Palette,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="p-1 pt-4 pb-4"
                              >
                                <OngoingProjects
                                  userDetail={userDetail}
                                  status={true}
                                />
                              </GridContainer>
                            ),
                          },

                          {
                            tabButton: "Completed Rides",
                            disabled: true,
                            tabIcon: Palette,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="p-1 pt-4 pb-4"
                              >
                                <OngoingProjects
                                  userDetail={userDetail}
                                  status={"complete"}
                                />
                              </GridContainer>
                            ),
                          },
                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Earnings"
                                : "Payments",
                            tabIcon: Payment,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="pb-4 pt-4"
                              >
                                {userDetail.userType == "seller" ? (
                                  <EarningComponent {...{ userDetail }} />
                                ) : (
                                  <PaymentComponent {...{ userDetail }} />
                                )}
                              </GridContainer>
                            ),
                          },
                        ]
                      : [
                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Available Rides"
                                : "Live Rides",
                            tabIcon: Camera,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="p-1 pt-4 pb-4"
                              >
                                <OngoingProjects
                                  userDetail={userDetail}
                                  status={false}
                                />
                              </GridContainer>
                            ),
                          },
                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Your Rides"
                                : "Assigned Rides",
                            tabIcon: Palette,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="p-1 pt-4 pb-4"
                              >
                                <OngoingProjects
                                  userDetail={userDetail}
                                  status={true}
                                />
                              </GridContainer>
                            ),
                          },

                          {
                            tabButton:
                              userDetail.userType == "seller"
                                ? "Earnings"
                                : "Payments",
                            tabIcon: Payment,
                            tabContent: (
                              <GridContainer
                                justify="center"
                                className="pb-4 pt-4"
                              >
                                {userDetail.userType == "seller" ? (
                                  <EarningComponent {...{ userDetail }} />
                                ) : (
                                  <PaymentComponent {...{ userDetail }} />
                                )}
                              </GridContainer>
                            ),
                          },
                        ]
                  }
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
