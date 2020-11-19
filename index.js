const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("To use the USSD dail 6120");
});

app.post("/ussd", (req, res) => {
  // Read the variables sent via POST from our API

  const {
    session_id,
    tstamp,
    phone_number,
    from,
    request_string,
    location,
    age,
    text,
  } = req.body;

  let response = "";

  if (text === "") {
    // This is the first request. Note how we start the response with CON
    response = `Welcome
      We are here for you, talk to us about sexual
      1. Report an incidence
      `;
  } else if (text === "1") {
    // Business logic for first level response
    response = `Did the incident happen to you?
      1. No
      2. Yes
      0. Back`;
  } else if (text === "1*1") {
    response = `How are you related to him/her?
      1. Relative
      2. Friend
      3. School-mate
      4. Others
      0. Back`;
  } else if (
    text === "1*2" ||
    text === "1*1*1" ||
    text === "1*1*2" ||
    text === "1*1*3" ||
    text === "1*1*4"
  ) {
    response = `What is your gender?
    1. Male
    2. Female
    3. Back`;
  } else if (
    text === "1*2*1" ||
    text === "1*2*2" ||
    text === "1*1*1*1" ||
    text === "1*1*1*2" ||
    text === "1*1*2*1" ||
    text === "1*1*2*2" ||
    text === "1*1*3*1" ||
    text === "1*1*3*2" ||
    text === "1*1*4*1" ||
    text === "1*1*4*2"
  ) {
    response = `Does the victim have any disability?
    1. No
    2. Yes
    3. Back
    `;
  } else if (
    text === "1*2*1*1" ||
    text === "1*2*1*2" ||
    text === "1*2*2*1" ||
    text === "1*2*2*2" ||
    text === "1*1*1*1*1" ||
    text === "1*1*1*1*2" ||
    text === "1*1*1*2*1" ||
    text === "1*1*1*2*2" ||
    text === "1*1*2*1*1" ||
    text === "1*1*2*1*2" ||
    text === "1*1*2*2*1" ||
    text === "1*1*2*2*1" ||
    text === "1*1*3*1*1" ||
    text === "1*1*3*1*2" ||
    text === "1*1*3*2*1" ||
    text === "1*1*3*2*2" ||
    text === "1*1*4*1*1" ||
    text === "1*1*4*1*2" ||
    text === "1*1*4*2*1" ||
    text === "1*1*4*2*2"
  ) {
    response = `What happened to you?
      1. Bad touches
      2. I was raped
      3. I was defiled
      4. Someone tried to rape me
      5. Others
      0. Back
      `;
  } else if (
    text === "1*2*1*1*1" ||
    text === "1*2*1*1*2" ||
    text === "1*2*1*1*3" ||
    text === "1*2*1*1*4" ||
    text === "1*2*1*1*5" ||
    text === "1*2*1*2*1" ||
    text === "1*2*1*2*2" ||
    text === "1*2*1*2*3" ||
    text === "1*2*1*2*4" ||
    text === "1*2*1*2*5" ||
    text === "1*2*2*1*1" ||
    text === "1*2*2*1*2" ||
    text === "1*2*2*1*3" ||
    text === "1*2*2*1*4" ||
    text === "1*2*2*1*5" ||
    text === "1*2*2*2*1" ||
    text === "1*2*2*2*2" ||
    text === "1*2*2*2*3" ||
    text === "1*2*2*2*4" ||
    text === "1*2*2*2*5" ||
    text === "1*1*1*1*1*1" ||
    text === "1*1*1*1*1*2" ||
    text === "1*1*1*1*1*3" ||
    text === "1*1*1*1*1*4" ||
    text === "1*1*1*1*1*5" ||
    text === "1*1*1*1*2*1" ||
    text === "1*1*1*1*2*2" ||
    text === "1*1*1*1*2*3" ||
    text === "1*1*1*1*2*4" ||
    text === "1*1*1*1*2*5" ||
    text === "1*1*1*2*1*1" ||
    text === "1*1*1*2*1*2" ||
    text === "1*1*1*2*1*3" ||
    text === "1*1*1*2*1*4" ||
    text === "1*1*1*2*1*5" ||
    text === "1*1*1*2*2*1" ||
    text === "1*1*1*2*2*2" ||
    text === "1*1*1*2*2*3" ||
    text === "1*1*1*2*2*4" ||
    text === "1*1*1*2*2*5" ||
    text === "1*1*2*1*1*1" ||
    text === "1*1*2*1*1*2" ||
    text === "1*1*2*1*1*3" ||
    text === "1*1*2*1*1*4" ||
    text === "1*1*2*1*1*5" ||
    text === "1*1*2*1*2*1" ||
    text === "1*1*2*1*2*2" ||
    text === "1*1*2*1*2*3" ||
    text === "1*1*2*1*2*4" ||
    text === "1*1*2*1*2*5" ||
    text === "1*1*2*2*1*1" ||
    text === "1*1*2*2*1*2" ||
    text === "1*1*2*2*1*3" ||
    text === "1*1*2*2*1*4" ||
    text === "1*1*2*2*1*5" ||
    text === "1*1*2*2*1*1" ||
    text === "1*1*2*2*1*2" ||
    text === "1*1*2*2*1*3" ||
    text === "1*1*2*2*1*4" ||
    text === "1*1*2*2*1*5" ||
    text === "1*1*3*1*1*1" ||
    text === "1*1*3*1*1*2" ||
    text === "1*1*3*1*1*3" ||
    text === "1*1*3*1*1*4" ||
    text === "1*1*3*1*1*5" ||
    text === "1*1*3*1*2*1" ||
    text === "1*1*3*1*2*2" ||
    text === "1*1*3*1*2*3" ||
    text === "1*1*3*1*2*4" ||
    text === "1*1*3*1*2*5" ||
    text === "1*1*3*2*1*1" ||
    text === "1*1*3*2*1*2" ||
    text === "1*1*3*2*1*3" ||
    text === "1*1*3*2*1*4" ||
    text === "1*1*3*2*1*5" ||
    text === "1*1*3*2*2*1" ||
    text === "1*1*3*2*2*2" ||
    text === "1*1*3*2*2*3" ||
    text === "1*1*3*2*2*4" ||
    text === "1*1*3*2*2*5" ||
    text === "1*1*4*1*1*1" ||
    text === "1*1*4*1*1*2" ||
    text === "1*1*4*1*1*3" ||
    text === "1*1*4*1*1*4" ||
    text === "1*1*4*1*1*5" ||
    text === "1*1*4*1*2*1" ||
    text === "1*1*4*1*2*2" ||
    text === "1*1*4*1*2*3" ||
    text === "1*1*4*1*2*4" ||
    text === "1*1*4*1*2*5" ||
    text === "1*1*4*2*1*1" ||
    text === "1*1*4*2*1*2" ||
    text === "1*1*4*2*1*3" ||
    text === "1*1*4*2*1*4" ||
    text === "1*1*4*2*1*5" ||
    text === "1*1*4*2*2*1" ||
    text === "1*1*4*2*2*2" ||
    text === "1*1*4*2*2*3" ||
    text === "1*1*4*2*2*4" ||
    text === "1*1*4*2*2*5"
  ) {
    response = `Enter your age ${age}`;
  } else if (
    text === "1*2*1*1*1*next" ||
    text === "1*2*1*1*2*next" ||
    text === "1*2*1*1*3*next" ||
    text === "1*2*1*1*4*next" ||
    text === "1*2*1*1*5*next" ||
    text === "1*2*1*2*1*next" ||
    text === "1*2*1*2*2*next" ||
    text === "1*2*1*2*3*next" ||
    text === "1*2*1*2*4*next" ||
    text === "1*2*1*2*5*next" ||
    text === "1*2*2*1*1*next" ||
    text === "1*2*2*1*2*next" ||
    text === "1*2*2*1*3*next" ||
    text === "1*2*2*1*4*next" ||
    text === "1*2*2*1*5*next" ||
    text === "1*2*2*2*1*next" ||
    text === "1*2*2*2*2*next" ||
    text === "1*2*2*2*3*next" ||
    text === "1*2*2*2*4*next" ||
    text === "1*2*2*2*5*next" ||
    text === "1*1*1*1*1*1*next" ||
    text === "1*1*1*1*1*2*next" ||
    text === "1*1*1*1*1*3*next" ||
    text === "1*1*1*1*1*4*next" ||
    text === "1*1*1*1*1*5*next" ||
    text === "1*1*1*1*2*1*next" ||
    text === "1*1*1*1*2*2*next" ||
    text === "1*1*1*1*2*3*next" ||
    text === "1*1*1*1*2*4*next" ||
    text === "1*1*1*1*2*5*next" ||
    text === "1*1*1*2*1*1*next" ||
    text === "1*1*1*2*1*2*next" ||
    text === "1*1*1*2*1*3*next" ||
    text === "1*1*1*2*1*4*next" ||
    text === "1*1*1*2*1*5*next" ||
    text === "1*1*1*2*2*1*next" ||
    text === "1*1*1*2*2*2*next" ||
    text === "1*1*1*2*2*3*next" ||
    text === "1*1*1*2*2*4*next" ||
    text === "1*1*1*2*2*5*next" ||
    text === "1*1*2*1*1*1*next" ||
    text === "1*1*2*1*1*2*next" ||
    text === "1*1*2*1*1*3*next" ||
    text === "1*1*2*1*1*4*next" ||
    text === "1*1*2*1*1*5*next" ||
    text === "1*1*2*1*2*1*next" ||
    text === "1*1*2*1*2*2*next" ||
    text === "1*1*2*1*2*3*next" ||
    text === "1*1*2*1*2*4*next" ||
    text === "1*1*2*1*2*5*next" ||
    text === "1*1*2*2*1*1*next" ||
    text === "1*1*2*2*1*2*next" ||
    text === "1*1*2*2*1*3*next" ||
    text === "1*1*2*2*1*4*next" ||
    text === "1*1*2*2*1*5*next" ||
    text === "1*1*2*2*1*1*next" ||
    text === "1*1*2*2*1*2*next" ||
    text === "1*1*2*2*1*3*next" ||
    text === "1*1*2*2*1*4*next" ||
    text === "1*1*2*2*1*5*next" ||
    text === "1*1*3*1*1*1*next" ||
    text === "1*1*3*1*1*2*next" ||
    text === "1*1*3*1*1*3*next" ||
    text === "1*1*3*1*1*4*next" ||
    text === "1*1*3*1*1*5*next" ||
    text === "1*1*3*1*2*1*next" ||
    text === "1*1*3*1*2*2*next" ||
    text === "1*1*3*1*2*3*next" ||
    text === "1*1*3*1*2*4*next" ||
    text === "1*1*3*1*2*5*next" ||
    text === "1*1*3*2*1*1*next" ||
    text === "1*1*3*2*1*2*next" ||
    text === "1*1*3*2*1*3*next" ||
    text === "1*1*3*2*1*4*next" ||
    text === "1*1*3*2*1*5*next" ||
    text === "1*1*3*2*2*1*next" ||
    text === "1*1*3*2*2*2*next" ||
    text === "1*1*3*2*2*3*next" ||
    text === "1*1*3*2*2*4*next" ||
    text === "1*1*3*2*2*5*next" ||
    text === "1*1*4*1*1*1*next" ||
    text === "1*1*4*1*1*2*next" ||
    text === "1*1*4*1*1*3*next" ||
    text === "1*1*4*1*1*4*next" ||
    text === "1*1*4*1*1*5*next" ||
    text === "1*1*4*1*2*1*next" ||
    text === "1*1*4*1*2*2*next" ||
    text === "1*1*4*1*2*3*next" ||
    text === "1*1*4*1*2*4*next" ||
    text === "1*1*4*1*2*5*next" ||
    text === "1*1*4*2*1*1*next" ||
    text === "1*1*4*2*1*2*next" ||
    text === "1*1*4*2*1*3*next" ||
    text === "1*1*4*2*1*4*next" ||
    text === "1*1*4*2*1*5*next" ||
    text === "1*1*4*2*2*1*next" ||
    text === "1*1*4*2*2*2*next" ||
    text === "1*1*4*2*2*3*next" ||
    text === "1*1*4*2*2*4*next" ||
    text === "1*1*4*2*2*5*next"
  ) {
    response = `Enter Location where it happened
    ${location}`;
  } else if (
    text === "1*2*1*1*1*next*end" ||
    text === "1*2*1*1*2*next*end" ||
    text === "1*2*1*1*3*next*end" ||
    text === "1*2*1*1*4*next*end" ||
    text === "1*2*1*1*5*next*end" ||
    text === "1*2*1*2*1*next*end" ||
    text === "1*2*1*2*2*next*end" ||
    text === "1*2*1*2*3*next*end" ||
    text === "1*2*1*2*4*next*end" ||
    text === "1*2*1*2*5*next*end" ||
    text === "1*2*2*1*1*next*end" ||
    text === "1*2*2*1*2*next*end" ||
    text === "1*2*2*1*3*next*end" ||
    text === "1*2*2*1*4*next*end" ||
    text === "1*2*2*1*5*next*end" ||
    text === "1*2*2*2*1*next*end" ||
    text === "1*2*2*2*2*next*end" ||
    text === "1*2*2*2*3*next*end" ||
    text === "1*2*2*2*4*next*end" ||
    text === "1*2*2*2*5*next*end" ||
    text === "1*1*1*1*1*1*next*end" ||
    text === "1*1*1*1*1*2*next*end" ||
    text === "1*1*1*1*1*3*next*end" ||
    text === "1*1*1*1*1*4*next*end" ||
    text === "1*1*1*1*1*5*next*end" ||
    text === "1*1*1*1*2*1*next*end" ||
    text === "1*1*1*1*2*2*next*end" ||
    text === "1*1*1*1*2*3*next*end" ||
    text === "1*1*1*1*2*4*next*end" ||
    text === "1*1*1*1*2*5*next*end" ||
    text === "1*1*1*2*1*1*next*end" ||
    text === "1*1*1*2*1*2*next*end" ||
    text === "1*1*1*2*1*3*next*end" ||
    text === "1*1*1*2*1*4*next*end" ||
    text === "1*1*1*2*1*5*next*end" ||
    text === "1*1*1*2*2*1*next*end" ||
    text === "1*1*1*2*2*2*next*end" ||
    text === "1*1*1*2*2*3*next*end" ||
    text === "1*1*1*2*2*4*next*end" ||
    text === "1*1*1*2*2*5*next*end" ||
    text === "1*1*2*1*1*1*next*end" ||
    text === "1*1*2*1*1*2*next*end" ||
    text === "1*1*2*1*1*3*next*end" ||
    text === "1*1*2*1*1*4*next*end" ||
    text === "1*1*2*1*1*5*next*end" ||
    text === "1*1*2*1*2*1*next*end" ||
    text === "1*1*2*1*2*2*next*end" ||
    text === "1*1*2*1*2*3*next*end" ||
    text === "1*1*2*1*2*4*next*end" ||
    text === "1*1*2*1*2*5*next*end" ||
    text === "1*1*2*2*1*1*next*end" ||
    text === "1*1*2*2*1*2*next*end" ||
    text === "1*1*2*2*1*3*next*end" ||
    text === "1*1*2*2*1*4*next*end" ||
    text === "1*1*2*2*1*5*next*end" ||
    text === "1*1*2*2*1*1*next*end" ||
    text === "1*1*2*2*1*2*next*end" ||
    text === "1*1*2*2*1*3*next*end" ||
    text === "1*1*2*2*1*4*next*end" ||
    text === "1*1*2*2*1*5*next*end" ||
    text === "1*1*3*1*1*1*next*end" ||
    text === "1*1*3*1*1*2*next*end" ||
    text === "1*1*3*1*1*3*next*end" ||
    text === "1*1*3*1*1*4*next*end" ||
    text === "1*1*3*1*1*5*next*end" ||
    text === "1*1*3*1*2*1*next*end" ||
    text === "1*1*3*1*2*2*next*end" ||
    text === "1*1*3*1*2*3*next*end" ||
    text === "1*1*3*1*2*4*next*end" ||
    text === "1*1*3*1*2*5*next*end" ||
    text === "1*1*3*2*1*1*next*end" ||
    text === "1*1*3*2*1*2*next*end" ||
    text === "1*1*3*2*1*3*next*end" ||
    text === "1*1*3*2*1*4*next*end" ||
    text === "1*1*3*2*1*5*next*end" ||
    text === "1*1*3*2*2*1*next*end" ||
    text === "1*1*3*2*2*2*next*end" ||
    text === "1*1*3*2*2*3*next*end" ||
    text === "1*1*3*2*2*4*next*end" ||
    text === "1*1*3*2*2*5*next*end" ||
    text === "1*1*4*1*1*1*next*end" ||
    text === "1*1*4*1*1*2*next*end" ||
    text === "1*1*4*1*1*3*next*end" ||
    text === "1*1*4*1*1*4*next*end" ||
    text === "1*1*4*1*1*5*next*end" ||
    text === "1*1*4*1*2*1*next*end" ||
    text === "1*1*4*1*2*2*next*end" ||
    text === "1*1*4*1*2*3*next*end" ||
    text === "1*1*4*1*2*4*next*end" ||
    text === "1*1*4*1*2*5*next*end" ||
    text === "1*1*4*2*1*1*next*end" ||
    text === "1*1*4*2*1*2*next*end" ||
    text === "1*1*4*2*1*3*next*end" ||
    text === "1*1*4*2*1*4*next*end" ||
    text === "1*1*4*2*1*5*next*end" ||
    text === "1*1*4*2*2*1*next*end" ||
    text === "1*1*4*2*2*2*next*end" ||
    text === "1*1*4*2*2*3*next*end" ||
    text === "1*1*4*2*2*4*next*end" ||
    text === "1*1*4*2*2*5*next*end"
  ) {
    response = `END Your Safepal number is ${phone_number}.
    SafePal will contact you soon`;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(3004, () => {
  console.log("App is listenining at port 3004");
});
