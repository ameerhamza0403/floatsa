import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Backdrop from "components/Backdrop/Backdrop";
import DatePicker from "components/DatePicker/Datepicker";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
// import image from "assets/img/bg7.jpg";
import images from "../../links/links";
import { emailRegex, passRegex, numRegex } from "../../variables/constants";
import moment from "moment";
import { Redirect } from "react-router-dom";

import Snackbar from "components/Snackbar/snackbar";
import * as firebase from "firebase";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [signInorUp, setSignInorUp] = React.useState(true);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [selectedDate, setSelectedDate] = React.useState(
    new Date(
      `${
        new Date().getFullYear() - 12
      }-${new Date().getMonth()}-${new Date().getDate()}`
    )
  );
  const [loginEmail, setLoginEmail] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [loginPass, setLoginPass] = React.useState("");
  const [registerPass, setRegisterPass] = React.useState("");
  const [registerPassError, setRegisterPassError] = React.useState(false);
  const [registerEmailError, setRegisterEmailError] = React.useState(false);
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [openLoader, setOpenLoader] = React.useState(false);
  const [snack, setSnack] = React.useState({
    status: false,
    message: "",
    title: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    redirectProfile();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(centerMe);
      console.log("here");
    } else {
    }
  }, []);

  const redirectProfile = async () => {
    const user = await JSON.parse(localStorage.getItem("@user"));
    if (user != null) {
      setRedirect(true);
      setTimeout(() => {
        setRedirect(false);
      }, 50);
    }
  };

  const centerMe = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const handleSubmit = () => {
    setOpenLoader(true);
    setSnack({
      status: false,
      message: "",
      title: "",
    });

    setTimeout(() => {
      if (signInorUp) {
        //Login Validation----------------------------
        if (loginEmail.length < 0 || !emailRegex.test(loginEmail)) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message:
              "The email field is either empty or the text is not a valid email address, please try again.",
            title: "Email is invalid",
          });
          return;
        }

        if (loginPass.length < 1) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message: "The password is not correct please add correct password",
            title: "Please Try Again",
          });
          return;
        }
        // Login Submission-----------------------

        firebase
          .auth()
          .signInWithEmailAndPassword(loginEmail, loginPass)
          .then((res) => {
            firebase
              .firestore()
              .collection("Users")
              .doc(res.user.uid)
              .get()
              .then((doc) => {
                if (!doc.exists) {
                  setOpenLoader(false);
                  setSnack({
                    status: true,
                    message: "User Does Not Exists",
                    title: "Error",
                  });
                } else {
                  console.log(props, "Document data:", doc.data());
                  localStorage.setItem("@user", JSON.stringify(doc.data()));
                  setOpenLoader(false);
                  setSnack({
                    status: true,
                    message: "Successfully Logged in",
                    title: "Success",
                  });
                  props.history.push("./");
                }
              })
              .catch((err) => {
                setOpenLoader(false);
                setSnack({
                  status: true,
                  message: err.message,
                  title: "Error",
                });
              });
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // ...

            setOpenLoader(false);
            setSnack({
              status: true,
              message: error.message,
              title: "Error has Occured",
            });
          });
      } else {
        // Sign Up Validation--------------------
        if (registerEmail.length < 0 || !emailRegex.test(registerEmail)) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message:
              "The email field is either empty or the text is not a valid email address, please try again.",
            title: "Email is invalid",
          });
          return;
        }

        if (!passRegex.test(registerPass) || registerPass.length < 8) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message:
              "This is not a strong password, A strong password contains numbers and upper and lower case letters.",
            title: "Please Try Again",
          });
          return;
        }
        if (name.length < 3) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message: "Please enter your real name.",
            title: "Please Try Again",
          });
          return;
        }
        if (phone.length < 10) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message: "Please enter correct phone number",
            title: "Please Try Again",
          });
          return;
        }
        if (moment(selectedDate).isAfter("2008-01-01", "year")) {
          setOpenLoader(false);
          setSnack({
            status: true,
            message:
              "Sorry you are under age, people who are above 12 can register for this application. Please ask your father to sign up for you.",
            title: "Sorry",
          });
          return;
        }

        // Sign Up Submission -------------------

        firebase
          .auth()
          .createUserWithEmailAndPassword(registerEmail, registerPass)
          .then((res) => {
            console.log(res.user.uid);
            firebase
              .firestore()
              .collection("Users")
              .doc(res.user.uid)
              .set({
                id: res.user.uid,
                email: registerEmail,
                password: registerPass,
                doBirth: selectedDate,
                phone: phone,
                name: name,
                JoinDate: new Date(),
                userType: "buyer",
                location: location,
              })
              .then((res) => {
                setOpenLoader(false);

                setSnack({
                  status: true,
                  message: "Login has been created Please Sign In Now",
                  title: "Success",
                });
              })
              .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                setOpenLoader(false);

                setSnack({
                  status: true,
                  message: error.message,
                  title: "Error has Occured",
                });
              });
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            setOpenLoader(false);

            setSnack({
              status: true,
              message: error.message,
              title: "Error has Occured",
            });
          });
      }
    }, 100);
  };

  const classes = useStyles();
  const { ...rest } = props;

  if (redirect) {
    return <Redirect to="/profile" />;
  }

  return (
    <React.Fragment>
      <Backdrop open={openLoader} />
      <Snackbar
        open={snack.status}
        message={snack.message}
        title={snack.title}
      />
      <div>
        <Header
          absolute
          // color="transparent"
          brand="FLOATSTA"
          rightLinks={<HeaderLinks />}
          color="white"
          // fixed
          changeColorOnScroll={{
            height: 400,
            color: "white",
          }}
          {...rest}
        />

        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + images[1] + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>{signInorUp ? "LOGIN" : "REGISTER"}</h4>
                      {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                    </CardHeader>
                    <p className={classes.divider}>
                      Or{" "}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setCardAnimation("cardHidden");
                          setLoginEmail("");
                          setLoginPass("");
                          setRegisterPass("");
                          setRegisterPassError(false);
                          setRegisterEmailError(false);
                          setRegisterEmail("");
                          setName("");
                          setPhone("");
                          setTimeout(function () {
                            setSignInorUp(!signInorUp);
                            setCardAnimation("");
                          }, 700);
                        }}
                      >
                        {signInorUp ? "Register" : "Login"}
                      </span>
                    </p>
                    <CardBody>
                      {signInorUp ? (
                        <React.Fragment>
                          <CustomInput
                            labelText="Email"
                            id="email"
                            value={loginEmail}
                            onChange={(e) => {
                              // if(e.target.value.test(emailRegex)){
                              setLoginEmail(e.target.value);
                              // }
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <CustomInput
                            labelText="Password"
                            id="pass"
                            value={loginPass}
                            onChange={(e) => {
                              setLoginPass(e.target.value);
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off",
                            }}
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <CustomInput
                            labelText="First Name"
                            id="first"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <CustomInput
                            labelText="Email"
                            id="email"
                            value={registerEmail}
                            error={registerEmailError}
                            onChange={(e) => {
                              setRegisterEmailError(true);
                              setRegisterEmail(e.target.value);
                              if (emailRegex.test(e.target.value)) {
                                setRegisterEmailError(false);
                              }
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "email",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {registerEmailError && (
                            <span
                              style={{
                                color: "red",
                                fontSize: 12,
                              }}
                            >
                              Invalid email.
                            </span>
                          )}
                          <CustomInput
                            labelText="Password"
                            id="pass"
                            value={registerPass}
                            error={registerPassError}
                            onChange={(e) => {
                              setRegisterPassError(true);
                              setRegisterPass(e.target.value);
                              if (passRegex.test(e.target.value)) {
                                setRegisterPassError(false);
                              }
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "password",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off",
                            }}
                          />
                          {registerPassError && (
                            <span
                              style={{
                                color: "red",
                                fontSize: 12,
                              }}
                            >
                              Password must be atleast 8 characters long, has
                              upper and lower case letters and numbers in it.
                            </span>
                          )}
                          <CustomInput
                            labelText="Phone Number"
                            id="number"
                            value={phone}
                            error={
                              phone.length < 11 && phone.length > 0
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              if (
                                numRegex.test(e.target.value) ||
                                e.target.value == ""
                              ) {
                                setPhone(e.target.value);
                              }
                            }}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    phone
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: "off",
                            }}
                          />
                          <DatePicker
                            title="Date of Birth"
                            selectedDate={selectedDate}
                            handleDateChange={handleDateChange}
                          />
                        </React.Fragment>
                      )}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={handleSubmit}
                      >
                        SUBMIT
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    </React.Fragment>
  );
}
