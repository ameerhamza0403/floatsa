import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// @material-ui/icons
import Map from "@material-ui/icons/Room";
import EmojiPeople from "@material-ui/icons/EmojiPeople";
import Rowing from "@material-ui/icons/Rowing";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import GoogleMap from "../Map/Map";
import Button from "../../../components/CustomButtons/Button";
import Dialog from "../../../components/Dialog/Dialog";
import DatePicker from "components/DatePicker/Datepicker";
import TimePicker from "components/TimePicker/TimePicker";
import MultiSelect from "components/MultiSelect/MultiSelect";
import { Redirect } from "react-router-dom";
import SingleSelect from "components/SingleSelect/SingleSelect";
import * as firebase from "firebase";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { randomId, GOOGLE_API_KEY } from "../../../variables/constants";
import Backdrop from "components/Backdrop/Backdrop";

const useStyles = makeStyles(styles);

export default function MapSection() {
  const [openLoader, setOpenLoader] = React.useState(false);
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    )
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
        new Date().getDate() + 1
      }`
    )
  );

  const [selectedStartDepTime, setSelectedStartDepTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedEndDepTime, setSelectedEndDepTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedStartRetTime, setSelectedStartRetTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedEndRetTime, setSelectedEndRetTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [intent, setIntent] = React.useState([]);
  const [length, setLength] = React.useState('');
  const [drive, setDrive] = React.useState('');
  const [vacancy, setVacancy] = React.useState('');
  const [equipment, setEquipment] = React.useState([]);
  const [food, setFood] = React.useState([]);
  const [intentOptions, setIntentOptions] = React.useState([
    { lable: "Fishing", value: "fishing" },
    { lable: "SCUBA", value: "scuba" },
    { lable: "Ski / Tow", value: "ski" },
    { lable: "Pleasure", value: "pleasure" },
    { lable: "Cruising", value: "cruising" },
    { lable: "Parasail", value: "parasail" },
  ]);

  const [foodOptions, setFoodOptions] = React.useState([
    { lable: "Breakfast", value: "breakfast" },
    { lable: "Lunch", value: "lunch" },
    { lable: "Dinner", value: "dinner" },
    { lable: "Water", value: "water" },
    { lable: "Soft drinks", value: "softdrink" },
  ]);

  const [equipmentOptions, setEquipmentOptions] = React.useState([
    { lable: "Tackle", value: "tackle" },
    { lable: "Bait", value: "bait" },
    { lable: "Mask / Snorkel / Fins", value: "mask" },
    { lable: "Wetsuit", value: "wetsuit" },
    { lable: "Tanks / BCD", value: "tank" },
    { lable: "Skis", value: "skis" },
    { lable: "Wakeboard", value: "wakeboard" },
    { lable: "Inflatable(s)", value: "inflatable" },
  ]);

  const [lengthOptions, setLengthOptions] = React.useState([
    { lable: "Up to 12ft", value: "Up to 12ft" },
    { lable: "12-15ft", value: "12-15ft" },
    { lable: "15-18ft", value: "15-18ft" },
    { lable: "18-24ft", value: "18-24ft" },
    { lable: "24-30ft", value: "24-30ft" },
    { lable: "30-40ft", value: "30-40ft" },
    { lable: "Above 40ft", value: "Above 40ft" },
  ]);

  const [driveOptions, setdriveOptions] = React.useState([
    { lable: "Power", value: "power" },
    { lable: "Sail", value: "sail" },
    { lable: "Unpowered", value: "unpowered" },
  ]);

  const [vacancyOptions, setVacancyOptions] = React.useState([
    { lable: "1", value: "1" },
    { lable: "2", value: "2" },
    { lable: "3", value: "3" },
    { lable: "4", value: "4" },
    { lable: "5", value: "5" },
    { lable: "6", value: "6" },
    { lable: "7", value: "7" },
    { lable: "8", value: "8" },
    { lable: "9", value: "9" },
    { lable: "10", value: "10" },
    { lable: "11", value: "11" },
    { lable: "12", value: "12" },
    { lable: "13", value: "13" },
    { lable: "14", value: "14" },
    { lable: "15", value: "15" },
  ]);

  const handleChangeSelect = (e, a) => {
    if (a == 1) {
      setIntent(e.target.value);
    } else if (a == 2) {
      setLength(e.target.value);
    } else if (a == 3) {
      setDrive(e.target.value);
    } else if (a == 4) {
      setVacancy(e.target.value);
    } else if (a == 5) {
      setEquipment(e.target.value);
    } else if (a == 6) {
      setFood(e.target.value);
    }
  };

  let changelatlong = (lat, lng) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleDateChange = (date, a) => {
    if (a == 1) {
      setSelectedStartDate(date);
    } else if (a == 2) {
      setSelectedEndDate(date);
    } else if (a == 3) {
      setSelectedStartDepTime(date);
    } else if (a == 4) {
      setSelectedEndDepTime(date);
    } else if (a == 5) {
      setSelectedStartRetTime(date);
    } else if (a == 6) {
      setSelectedEndRetTime(date);
    }
  };

  let submitFn = async () => {
    console.log("latitude", latitude);
    console.log("longitude", longitude);
    console.log("selectedEndDate", selectedEndDate);
    console.log("selectedStartDate", selectedStartDate);
    console.log("selectedStartDepTime", selectedStartDepTime);
    console.log("selectedStartRetTime", selectedStartRetTime);
    console.log("selectedEndDepTime", selectedEndDepTime);
    console.log("selectedEndRetTime", selectedEndRetTime);
    console.log("intent", intent);
    console.log("drive", drive);
    console.log("vacancy", vacancy);
    console.log("length", length);
    console.log("food", food);
    console.log("equipment", equipment);
    setOpenLoader(true);

    const locationFetch = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    );
    let location = await locationFetch.json();
    const userInfo = JSON.parse(await localStorage.getItem("@user"));
    console.log("randomId: ", randomId(), userInfo);
    const random = randomId();
    firebase
      .firestore()
      .collection("trips")
      .doc(random)
      .set({
        id: random,
        name: userInfo.name,
        email: userInfo.email,
        userId: userInfo.id,
        location: { lat: latitude, long: longitude },
        selectedEndDate: selectedEndDate,
        selectedStartDate: selectedStartDate,
        selectedStartDepTime: selectedStartDepTime,
        selectedStartRetTime: selectedStartRetTime,
        selectedEndDepTime: selectedEndDepTime,
        selectedEndRetTime: selectedEndRetTime,
        intent: intent,
        drive: drive,
        vacancy: vacancy,
        length: length,
        location: location.results[0].formatted_address,
        food: food,
        status: "live",
        equipment: equipment,
        date: new Date(),
        phone: userInfo.phone,
      })
      .then((res) => {
        console.log(res);
        clearForm();
        setOpenLoader(false);
      })
      .catch((err) => {
        setOpenLoader(false);
        console.log(err);
      });
  };

  const [redirect, setRedirect] = React.useState(false);

  let clearForm = () => {
    setLatitude("");
    setLongitude("");
    setSelectedEndDate(
      new Date(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() + 1
        }`
      )
    );
    setSelectedStartDate(
      new Date(
        `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`
      )
    );
    setSelectedStartDepTime(new Date("2014-08-18T21:11:54"));
    setSelectedStartRetTime(new Date("2014-08-18T21:11:54"));
    setSelectedEndDepTime(new Date("2014-08-18T21:11:54"));
    setSelectedEndRetTime(new Date("2014-08-18T21:11:54"));
    setIntent([]);
    setDrive('');
    setVacancy('');
    setLength('');
    setFood([]);
    setEquipment([]);
    setOpenForm(false);
    setRedirect(true);
  };

  const classes = useStyles();
  if (redirect) {
    return <Redirect to="/profile" />;
  }
  return (
    <React.Fragment>
      {/* <Backdrop open={openLoader} /> */}

      <Dialog
        title="We didn't recognize you"
        body={"Please Login to book your floatsta"}
        okText={<Link to="/login">LOGIN</Link>}
        cancelText="CANCEL"
        size="md"
        open={openLogin}
        handleCancel={() => setOpenLogin(false)}
        handleOk={() => setOpenLogin(false)}
      />
      <Dialog
        openLoader={openLoader}
        title="We need some more information to connect with the right boat owner"
        body={
          <React.Fragment>
            <div className="row">
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <DatePicker
                  title="Starting Date Range"
                  selectedDate={selectedStartDate}
                  disablePast
                  handleDateChange={(e) => handleDateChange(e, 1)}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <DatePicker
                  title="Ending Date Range"
                  selectedDate={selectedEndDate}
                  disablePast
                  handleDateChange={(e) => handleDateChange(e, 2)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <TimePicker
                  title="Departure Starting Time Range"
                  value={selectedStartDepTime}
                  handleChange={(e) => handleDateChange(e, 3)}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <TimePicker
                  title="Departure Ending Time Range"
                  value={selectedEndDepTime}
                  handleChange={(e) => handleDateChange(e, 4)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <TimePicker
                  title="Return Starting Time Range"
                  value={selectedStartRetTime}
                  handleChange={(e) => handleDateChange(e, 5)}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <TimePicker
                  title="Return Ending Time Range"
                  value={selectedEndRetTime}
                  handleChange={(e) => handleDateChange(e, 6)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <MultiSelect
                  name="Intent of the Trip"
                  value={intent}
                  handleChange={(e) => handleChangeSelect(e, 1)}
                  options={intentOptions}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <SingleSelect
                  name="Lenght"
                  value={length}
                  handleChange={(e) => handleChangeSelect(e, 2)}
                  options={lengthOptions}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <SingleSelect
                  name="Drive"
                  value={drive}
                  handleChange={(e) => handleChangeSelect(e, 3)}
                  options={driveOptions}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <SingleSelect
                  name="Vacancies"
                  value={vacancy}
                  handleChange={(e) => handleChangeSelect(e, 4)}
                  options={vacancyOptions}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <MultiSelect
                  name="Equipment Supplied"
                  value={equipment}
                  handleChange={(e) => handleChangeSelect(e, 5)}
                  options={equipmentOptions}
                />
              </div>
              <div className="col-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <MultiSelect
                  name="Food/Drink"
                  value={food}
                  handleChange={(e) => handleChangeSelect(e, 6)}
                  options={foodOptions}
                />
              </div>
            </div>
          </React.Fragment>
        }
        okText={"BOOK"}
        cancelText="CANCEL"
        size="md"
        open={openForm}
        handleCancel={() => clearForm()}
        handleOk={() => submitFn()}
      />
      <div className={classes.section} style={{ padding: "0px 0" }}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <GoogleMap
              lat={latitude}
              lng={longitude}
              changelatlong={changelatlong}
            />
            <Button
              style={{
                marginTop: "-120px",
              }}
              color="primary"
              size="lg"
              onClick={() => {
                const userdetail = JSON.parse(localStorage.getItem("@user"));
                if (userdetail != null) {
                  setOpenForm(true);
                } else {
                  setOpenLogin(true);
                }
              }}
            >
              Book for this place
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </React.Fragment>
  );
}
