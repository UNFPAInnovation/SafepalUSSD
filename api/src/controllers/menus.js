/* eslint-disable no-console */
/* eslint-disable camelcase */
/* This Module contains the USSD menus */
const fs = require('fs');
const { dataArray, checkSessionId } = require('../db');

// Reading the userReports from the report.json
const data = fs.readFileSync('./src/reports.json');
const reports = JSON.parse(data);

const menuOptions = {
  menuZero: (req, res) => {
    const { request_string } = req.body;

    if (request_string === '6') {
      // checks for session_id and then assigns next menu
      checkSessionId(1, req, dataArray);
      res.status(200).json({
        response_string: `We are here for you, talk to us about sexual violence \n 1. Report an incidence`,
        action: 'request',
      });
    } else {
      res
        .status(403)
        .json({ response_string: 'Something Went Wrong', action: 'end' });
    }
  },
  menuOne: (req, res) => {
    const { request_string } = req.body;

    if (request_string === '1') {
      // checks for session_id and then assigns next menu
      checkSessionId(2, req, dataArray);
      res.status(200).json({
        response_string: 'Did the incident happen to you? \n 1. No \n 2. Yes ',
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuTwo: (req, res) => {
    const { request_string } = req.body;

    if (request_string === '1') {
      // checks for session_id and then assigns next menu
      checkSessionId(3, req, dataArray);
      res.status(200).json({
        response_string:
          'How are you related to him/her? \n 1. Relative \n 2. Friend \n 3. School Mate \n 4. Other',
        action: 'request',
      });
    } else if (request_string === '2') {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray[i].menu = 4;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string: "What's your Gender? \n 1. Male \n 2. Female",
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuThree: (req, res) => {
    const { request_string } = req.body;

    if (
      request_string === '1' ||
      request_string === '2' ||
      request_string === '3' ||
      request_string === '4'
    ) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the reporter_relationship
          switch (request_string) {
            case '1':
              dataArray[i].reporter_relationship = 'Relative';
              break;
            case '2':
              dataArray[i].reporter_relationship = 'Friend';
              break;
            case '3':
              dataArray[i].reporter_relationship = 'School Mate';
              break;
            case '4':
              dataArray[i].reporter_relationship = 'Other';
              break;
            default:
          }
          dataArray[i].menu = 4;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      res.status(200).json({
        response_string: "What's his/her Gender? \n 1. Male \n 2. Female",
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuFour: (req, res) => {
    const { request_string } = req.body;

    if (request_string === '1' || request_string === '2') {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture Gender
          if (request_string === '1') {
            dataArray[i].gender = 'Male';
          } else {
            dataArray[i].gender = 'Female';
          }
          dataArray[i].menu = 5;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string:
          'Does the victim have any disability? \n 1. No \n 2. Yes',
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuFive: (req, res) => {
    const { request_string } = req.body;

    if (request_string === '1' || request_string === '2') {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture disability
          if (request_string === '1') {
            dataArray[i].disability = 'No';
          } else {
            dataArray[i].disability = 'Yes';
          }
          dataArray[i].menu = 6;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string:
          'What happened to you? \n 1. Bad Touches \n 2. I was Raped \n 3. I was Defiled \n 4. Someone tried to raped me \n 5. Other',
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuSix: (req, res) => {
    const { request_string } = req.body;

    if (
      request_string === '1' ||
      request_string === '2' ||
      request_string === '3' ||
      request_string === '4' ||
      request_string === '5'
    ) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the case details
          switch (request_string) {
            case '1':
              dataArray[i].details = 'Bad Touches';
              break;
            case '2':
              dataArray[i].details = 'I was Raped';
              break;
            case '3':
              dataArray[i].details = 'I was Defiled';
              break;
            case '4':
              dataArray[i].details = 'Someone tried to raped me';
              break;
            case '5':
              dataArray[i].details = 'Other';
              break;
            default:
          }
          dataArray[i].menu = 7;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res
        .status(200)
        .json({ response_string: 'Enter Your Age', action: 'request' });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuSeven: (req, res) => {
    const { request_string } = req.body;

    if (request_string.length > 0) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture age
          dataArray[i].age = request_string;
          dataArray[i].menu = 8;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string: 'Enter Location where it happened',
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuEight: (req, res) => {
    const { request_string } = req.body;
    if (request_string.length > 0) {
      let userReport;
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray[i].location = request_string;
          // delete the menu property
          delete dataArray[i].menu;
          userReport = dataArray[i];
        } else {
          console.log("could not find User's SessionID");
        }
      }

      // Saving the user report
      reports.push({ userData: userReport });
      fs.writeFileSync(
        './src/reports.json',
        JSON.stringify(reports, null, 2),
        'utf8'
      );
      console.log(userReport);

      const safepalNum = Math.floor(Math.random() * 90000);
      res.status(200).json({
        response_string: `Your SafePal Number is: ${safepalNum}...SafePal will contact you soon`,
        action: 'end',
        userData: userReport,
        reports,
      });

      // delete the UserData Object
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray.splice(i, 1);
        } else {
          console.log("could not find User's SessionID");
        }
      }
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
};

module.exports = menuOptions;
