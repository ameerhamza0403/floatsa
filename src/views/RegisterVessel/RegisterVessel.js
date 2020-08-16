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
import {
  emailRegex,
  passRegex,
  numRegex,
  randomId,
  alphanumeric,
} from "../../variables/constants";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "components/Snackbar/snackbar";
import * as firebase from "firebase";
import Dialog from "components/Dialog/Dialog";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SingleSelect from "components/SingleSelect/SingleSelect";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [operatorTypeOptions, setOperatorTypeOptions] = React.useState([
    { lable: "Operator", value: "operator" },
    { lable: "Skipper", value: "skipper" },
  ]);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date(
      `${
        new Date().getFullYear() - 12
      }-${new Date().getMonth()}-${new Date().getDate()}`
    )
  );

  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [police, setPolice] = React.useState("");
  const [driver, setDriver] = React.useState("");
  const [yellowcard, setYellowcard] = React.useState("");
  const [bluecard, setBluecard] = React.useState("");
  const [skipper, setSkipper] = React.useState("");
  const [facebook, setFacebook] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [publicLI, setPublicLI] = React.useState("");

  const [epirb, setEpirb] = React.useState("");
  const [marinRadio, setMarineRadio] = React.useState("");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [hin, setHin] = React.useState("");
  const [inspectiondate, setInspectionDate] = React.useState(
    new Date(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    )
  );
  const [reinspectiondate, setReinspectiondate] = React.useState(
    new Date(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    )
  );
  const [length, setLenght] = React.useState("");
  const [drive, setDrive] = React.useState("");
  const [numOfBerths, setNumOfBerths] = React.useState("");
  const [vesselInsurance, setVesselInsurance] = React.useState("");
  const [operaterInfo, setoperaterInfo] = React.useState(false);
  const [maxpassengers, setMaxpassengers] = React.useState("");
  const [aboutbio, setAboutbio] = React.useState("");
  const [operatorType, setOperatorType] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [openOperatorImage, setOpenOperatorImage] = React.useState(false);
  const [openVesselImage, setOpenVesselImage] = React.useState(false);
  const [operatorImage, setOperatorImage] = React.useState({});
  const [vesselImage, setVesselImage] = React.useState([]);
  const [vesselImages, setVesselImages] = React.useState([]);
  const [snack, setSnack] = React.useState({
    status: false,
    message: "",
    title: "",
  });

  React.useEffect(() => {
    redirectProfile();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(centerMe);
      console.log("here");
    } else {
    }
  }, []);

  let submitOperator = async () => {
    console.log("submit", operatorImage.url);
    if (!operatorImage.url) {
      alert("Upload Image!!");
    }
    if (
      name.length < 1 ||
      surname.length < 1 ||
      phone.length < 1 ||
      mobile.length < 1 ||
      email.length < 1 ||
      facebook.length < 1 ||
      !emailRegex.test(email) ||
      about.length < 1 ||
      police.length < 1 ||
      skipper.length < 1 ||
      driver.length < 1 ||
      publicLI.length < 1 ||
      yellowcard.length < 1 ||
      bluecard.length < 1
    ) {
      alert("Please fill all fields accurately!");
    } else {
      setOpenLoader(true);
      const user = await JSON.parse(localStorage.getItem("@user"));
      let randomSeller = randomId();
      firebase
        .firestore()
        .collection("Sailor")
        .doc(randomSeller)
        .set({
          id: randomSeller,
          userId: user.id,
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          mobile: mobile,
          facebook: facebook,
          publicLI: publicLI,
          driver: driver,
          image: operatorImage.url,
          about: about,
          police: police,
          yellowcard: yellowcard,
          bluecard: bluecard,
          skipper: skipper,
          operatorType: operatorType.value || "operator",
        })
        .then((e) => {
          setOpenLoader(false);
          setoperaterInfo(true);
        })
        .catch((err) => {
          setOpenLoader(false);
          setSnack({
            status: true,
            title: "An unknown error has occurred",
            message: JSON.stringify(err),
          });
        });
    }
  };

  let submitVessel = async () => {
    const user = await JSON.parse(localStorage.getItem("@user"));
    if (
      marinRadio.length < 1 ||
      registrationNumber.length < 1 ||
      inspectiondate.length < 1 ||
      reinspectiondate.length < 1 ||
      numOfBerths.length < 1 ||
      maxpassengers.length < 1 ||
      hin.length < 1 ||
      aboutbio.length < 1 ||
      vesselInsurance.length < 1
    ) {
      alert("Please Fill all field accurately");
    } else if (vesselImages.length < 1) {
      alert("Please upload images of the vessel");
    } else {
      setOpenLoader(true);
      let randomVessel = randomId();
      firebase
        .firestore()
        .collection("Vessel")
        .doc(randomVessel)
        .set({
          marinRadio: marinRadio,
          registrationNumber: registrationNumber,
          inspectiondate: inspectiondate,
          reinspectiondate: reinspectiondate,
          numOfBerths: numOfBerths,
          maxpassengers: maxpassengers,
          hin: hin,
          aboutbio: aboutbio,
          vesselInsurance: vesselInsurance,
          images: vesselImages,
          id: randomVessel,
          userId: user.id,
          date: new Date(),
        })
        .then((res) => {
          setOpenLoader(false);
          setMarineRadio("");
          setRegistrationNumber("");
          setInspectionDate(
            new Date(
              `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`
            )
          );
          setReinspectiondate(
            new Date(
              `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`
            )
          );
          setNumOfBerths("");
          setMaxpassengers("");
          setHin("");
          setAboutbio("");
          setVesselInsurance("");
          setVesselImage([]);
          setVesselImages([]);
          setSnack({
            status: true,
            title: "Your Vessel has been submitted for a review",
            message:
              "You can add more vessels if you want to, our team will manually review your information and will let you know about our final decision",
          });
        })
        .catch((err) => {
          setOpenLoader(false);
          setSnack({
            status: true,
            title: "An unknown error has occurred",
            message: JSON.stringify(err),
          });
        });
    }
  };

  const redirectProfile = async () => {
    const user = await JSON.parse(localStorage.getItem("@user"));
    if (user == null) {
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

  let handleDateChange = (e, a) => {
    if (a == 1) {
      setInspectionDate(e);
    } else {
      setReinspectiondate(e);
    }
  };

  const classes = useStyles();
  const { ...rest } = props;

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Backdrop open={openLoader} />
      <Snackbar
        open={snack.status}
        message={snack.message}
        title={snack.title}
      />
      <Dialog
        title="Please upload a proffessional photo of you that will be visible to clients"
        body={
          <React.Fragment>
            <div
              style={{
                paddingTop: 50,
                paddingBottom: 50,
                justifyContent: "center",
              }}
            >
              {operatorImage.blob == undefined ? (
                <div class="input-group">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      onChange={(e) => {
                        console.log(e.target.files);
                        if (e.target.files.length > 0) {
                          if (
                            !(
                              e.target.files[0].type == "image/jpeg" ||
                              e.target.files[0].type == "image/jpg" ||
                              e.target.files[0].type == "image/png"
                            )
                          ) {
                            alert("Please upload JPEG or PNG images only.");
                          } else if (e.target.files[0].size > 2100000) {
                            alert(
                              "Size cannot exceed 2MB, Please upload a normal picture"
                            );
                          } else {
                            var file = e.target.files[0];
                            var reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.addEventListener("load", (event) => {
                              var image = event.target.result;
                              var obj = {
                                blob: image,
                                url: null,
                                name: randomId(),
                                file: file,
                              };
                              setOperatorImage(obj);
                            });
                          }
                        }
                      }}
                    />
                    <label class="custom-file-label" for="inputGroupFile04">
                      <PhotoCameraIcon /> Choose file
                    </label>
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: 20,
                    }}
                  >
                    <img src={operatorImage.blob} width="200vw" height="auto" />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <span
                      title={"Change/Remove Image"}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        padding: 7,
                        // backgroundColor: 'red',
                        // borderRadius: 3
                      }}
                      onClick={() => setOperatorImage({})}
                    >
                      <DeleteForeverIcon />
                      {/* Change/Remove Image */}
                    </span>
                  </div>
                </React.Fragment>
              )}
            </div>
          </React.Fragment>
        }
        okText={"UPLOAD"}
        cancelText="CANCEL"
        size="md"
        open={openOperatorImage}
        handleCancel={() => setOpenOperatorImage(false)}
        handleOk={() => {
          setOpenLoader(true);
          firebase
            .storage()
            .ref(`images/${operatorImage.name}`)
            .put(operatorImage.file)
            .then((e) => {
              firebase
                .storage()
                .ref()
                .child(`images/${operatorImage.name}`)
                .getDownloadURL()
                .then((url) => {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = "blob";
                  xhr.onload = function (event) {
                    var blob = xhr.response;
                  };
                  xhr.open("GET", url);
                  xhr.send();
                  console.log(url);
                  let obj = operatorImage;
                  obj.url = url;
                  setOperatorImage(obj);
                  setOpenOperatorImage(false);
                  setOpenLoader(false);
                })
                .catch((err) => {
                  setOpenLoader(false);
                  alert("An unknown Error has Occured");
                });
            });
        }}
      />

      <Dialog
        title="Please upload few photos of the vessel that will be visible to the clients"
        body={
          <React.Fragment>
            <div
              style={{
                paddingTop: 50,
                paddingBottom: 50,
                justifyContent: "center",
              }}
            >
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      let arr = [];
                      let files = e.target.files;
                      console.log(files);
                      for (let key in files) {
                        arr.push(files[key]);
                      }
                      console.log(arr);
                      setVesselImage(arr);
                      // console.log(e.target.files);
                      // let arr = [];
                      // if (e.target.files.length > 0) {
                      //   for (
                      //     let index = 0;
                      //     index < e.target.files.length;
                      //     index++
                      //   ) {
                      //     var file = e.target.files[index];
                      //     var reader = new FileReader();
                      //     reader.readAsDataURL(e.target.files[index]);
                      //     reader.addEventListener("load", (event) => {
                      //       var image = event.target.result;
                      //       var obj = {
                      //         blob: image,
                      //         url: null,
                      //         name: randomId(),
                      //         file: file,
                      //       };
                      //       // console.log(obj, arr);

                      //       arr.push(obj);
                      //       console.clear();
                      //       console.log(arr);
                      //       setVesselImage(arr);
                      //     });
                      //   }
                      // }
                    }}
                  />
                  <label class="custom-file-label" for="inputGroupFile04">
                    <PhotoCameraIcon /> Choose file
                  </label>
                </div>
              </div>
              <React.Fragment>
                <div
                  style={{
                    // textAlign: "center",
                    paddingTop: 20,
                  }}
                >
                  {`${
                    vesselImage.length > 0 ? vesselImage.length - 2 : "0"
                  } image(s) selected ${
                    vesselImage.length > 0 && "Click on upload to confirm"
                  }`}
                  {/* {vesselImage.map((e) => (
                    <img src={e.blob} width="50vw" height="auto" />
                  ))} */}
                </div>
              </React.Fragment>
            </div>
          </React.Fragment>
        }
        okText={"UPLOAD"}
        cancelText="CANCEL"
        size="md"
        open={openVesselImage}
        handleCancel={() => setOpenVesselImage(false)}
        handleOk={() => {
          setOpenLoader(true);
          let arr = [];
          console.log(vesselImage);
          for (let index = 0; index < vesselImage.length - 2; index++) {
            var name = randomId();

            setOpenLoader(true);
            firebase
              .storage()
              .ref(`images/${name}`)
              .put(vesselImage[index])
              .then((e) => {
                firebase
                  .storage()
                  .ref()
                  .child(e.metadata.fullPath)
                  .getDownloadURL()
                  .then((url) => {
                    arr.push(url);
                    console.log(arr);
                    setVesselImages(arr);
                    setOpenLoader(false);
                    setOpenVesselImage(false);
                  })
                  .catch((err) => {
                    setOpenLoader(false);
                    alert("An unknown Error has Occured");
                  });
              });
          }
        }}
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
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register Vessel/Boats</h4>
                    </CardHeader>

                    <CardBody>
                      {operaterInfo == false ? (
                        <React.Fragment>
                          <div className="row" style={{ textAlign: "center" }}>
                            <span
                              style={{
                                width: "100%",
                                color: "purple",
                                fontWeight: "bold",
                                fontSize: 24,
                              }}
                            >
                              Personal Information
                            </span>
                          </div>

                          <div
                            className="row"
                            style={{
                              textAlign: "center",
                              display: "flex",
                              paddingTop: 50,
                              paddingBottom: 50,
                            }}
                          >
                            <div
                              style={{
                                margin: "auto",
                                width: 100,
                                height: 100,
                                borderRadius: !!operatorImage.url ? 0 : 100,
                                border: !!operatorImage.url
                                  ? "0px solid black"
                                  : "1px solid black",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenOperatorImage(true)}
                            >
                              <img
                                src={
                                  !!operatorImage.url
                                    ? operatorImage.url
                                    : "https://cdn4.iconfinder.com/data/icons/user-interface-glyph-5/32/User-512.png"
                                }
                                width={80}
                                height={80}
                              />
                              <span
                                style={{
                                  color: "white",
                                  backgroundColor: "#972FAF",
                                  padding: 4,
                                  borderRadius: 4,
                                }}
                              >
                                Upload Image
                              </span>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-6 col-sm-12 col-md-6">
                              <SingleSelect
                                name="Who are you?"
                                value={operatorType}
                                handleChange={(e) => {
                                  setOperatorType(e.target.value);
                                }}
                                options={operatorTypeOptions}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Name"
                                id="Name"
                                value={name}
                                onChange={(e) => {
                                  if (alphanumeric.test(e.target.value)) {
                                    setName(e.target.value);
                                  }
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Surname"
                                id="Surname"
                                value={surname}
                                onChange={(e) => {
                                  if (alphanumeric.test(e.target.value)) {
                                    setSurname(e.target.value);
                                  }
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Mobile"
                                id="mobile"
                                value={mobile}
                                onChange={(e) => {
                                  if (numRegex.test(e.target.value)) {
                                    setMobile(e.target.value);
                                  }
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Phone"
                                id="phone"
                                value={phone}
                                onChange={(e) => {
                                  if (numRegex.test(e.target.value)) {
                                    setPhone(e.target.value);
                                  }
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Email"
                                id="email"
                                value={email}
                                err
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                              <span style={{ color: "red", fontSize: 12 }}>
                                {email.length > 0 && emailRegex.test(email)
                                  ? ""
                                  : "invalid Email"}
                              </span>
                            </div>

                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Facebook Page"
                                id="fb"
                                value={facebook}
                                onChange={(e) => {
                                  setFacebook(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                              <CustomInput
                                labelText="Police Clearance"
                                id="police"
                                value={police}
                                onChange={(e) => {
                                  setPolice(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Skippers Ticket Number"
                                id="skipper"
                                value={skipper}
                                onChange={(e) => {
                                  setSkipper(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Driver Authority"
                                id="DA"
                                value={driver}
                                onChange={(e) => {
                                  setDriver(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Blue Card"
                                id="bc"
                                value={bluecard}
                                onChange={(e) => {
                                  setBluecard(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Yellow Card"
                                id="yc"
                                value={yellowcard}
                                onChange={(e) => {
                                  setYellowcard(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                              <CustomInput
                                labelText="Public Liability insurance - Up to $10M"
                                id="PLI"
                                value={publicLI}
                                onChange={(e) => {
                                  setPublicLI(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                              <CustomInput
                                labelText="About Field"
                                id="about"
                                value={about}
                                size={4}
                                multiline
                                onChange={(e) => {
                                  if (alphanumeric.test(e.target.value)) {
                                    setAbout(e.target.value);
                                  }
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <div className="row" style={{ textAlign: "center" }}>
                            <span
                              style={{
                                width: "100%",
                                color: "purple",
                                fontWeight: "bold",
                                fontSize: 24,
                              }}
                            >
                              Vessel Information
                            </span>
                          </div>

                          <div
                            className="row"
                            style={{
                              textAlign: "center",
                              display: "flex",
                              paddingTop: 50,
                              paddingBottom: 50,
                            }}
                          >
                            <div
                              style={{
                                margin: "auto",
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                border: "1px solid black",
                                cursor: "pointer",
                              }}
                              onClick={() => setOpenVesselImage(true)}
                            >
                              <img
                                src="https://cdn2.iconfinder.com/data/icons/vehicles-7/24/vehicles-20-512.png"
                                width={60}
                                height={60}
                                style={{
                                  marginTop: 15,
                                  padding: 10,
                                }}
                              />
                              <span
                                style={{
                                  color: "white",
                                  backgroundColor: "#972FAF",
                                  padding: 4,
                                  borderRadius: 4,
                                }}
                              >
                                Upload Image
                              </span>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-center">
                            {vesselImages.map((e) => (
                              <img src={e} width="50vw" height="auto" />
                            ))}
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Registration Number"
                                id="registrationNumber"
                                value={registrationNumber}
                                onChange={(e) => {
                                  setRegistrationNumber(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <DatePicker
                                title="Marine Inspection Date"
                                selectedDate={inspectiondate}
                                handleDateChange={(e) => handleDateChange(e, 1)}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <DatePicker
                                title="Reinspection Date"
                                selectedDate={reinspectiondate}
                                handleDateChange={(e) => handleDateChange(e, 2)}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="HIN"
                                id="HIN"
                                value={hin}
                                onChange={(e) => {
                                  setHin(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Drive"
                                id="drive"
                                value={drive}
                                onChange={(e) => {
                                  setDrive(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Length"
                                id="length"
                                value={length}
                                onChange={(e) => {
                                  setLenght(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Maximum Passengers"
                                id="maxpassengers"
                                value={maxpassengers}
                                onChange={(e) => {
                                  setMaxpassengers(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Number of Berths"
                                id="berths"
                                value={numOfBerths}
                                onChange={(e) => {
                                  setNumOfBerths(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                              <FormControlLabel
                                control={
                                  <Switch
                                    size="small"
                                    checked={epirb}
                                    onChange={(e) => setEpirb(!epirb)}
                                  />
                                }
                                label="EPIRB"
                              />
                            </div>
                            <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                              <FormControlLabel
                                control={
                                  <Switch
                                    size="small"
                                    checked={marinRadio}
                                    onChange={(e) =>
                                      setMarineRadio(!marinRadio)
                                    }
                                  />
                                }
                                label="Marine Radio"
                              />
                            </div>

                            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                              <CustomInput
                                labelText="Vessel Insurance"
                                id="insaurance"
                                value={vesselInsurance}
                                onChange={(e) => {
                                  setVesselInsurance(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-lg-12 col-md-12 col-sm-12">
                              <CustomInput
                                labelText="About/Bio"
                                id="about2"
                                value={aboutbio}
                                onChange={(e) => {
                                  setAboutbio(e.target.value);
                                }}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                multiline
                                size={4}
                              />
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={() =>
                          operaterInfo == false
                            ? submitOperator()
                            : submitVessel()
                        }
                      >
                        {operaterInfo == false ? "NEXT" : "Submit for Review"}
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
