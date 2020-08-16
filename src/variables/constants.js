var GOOGLE_API_KEY = "AIzaSyCzBaqFAu7qaotJmUby7ZNCpVjbj78wMsw";
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
var alphanumeric = /^[a-zA-Z0-9 ]*$/;
var numRegex = /^\d*$/;
var firebaseConfig = {
  apiKey: "AIzaSyAsRPNIjEx5h5dBHo5gAn7IkmTPdplyGaQ",
  authDomain: "floatstaapi.firebaseapp.com",
  databaseURL: "https://floatstaapi.firebaseio.com",
  projectId: "floatstaapi",
  storageBucket: "floatstaapi.appspot.com",
  messagingSenderId: "1016968835849",
  appId: "1:1016968835849:web:76b579072a78bbb333d9d8",
  measurementId: "G-HQ4ZP1KYT1",
};

let randomId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

export {
  GOOGLE_API_KEY,
  emailRegex,
  passRegex,
  numRegex,
  firebaseConfig,
  alphanumeric,
  randomId,
};
