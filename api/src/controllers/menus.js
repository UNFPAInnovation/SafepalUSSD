/* eslint-disable no-console */
/* eslint-disable camelcase */
/* This Module contains the USSD menus */
const { dataArray, checkSessionId } = require('../db');
const { sendReportToAPI, sendSMS, regions } = require('../utils');

const menuOptions = {
  menuZero: async (req, res) => {
    const { request_string } = req.body;

    if (request_string === '6') {
      // checks for session_id and then assigns next menu
      checkSessionId(1, req, dataArray);
      res.status(200).json({
        response_string: `We are here for you, talk to us about sexual violence \n 1. Report an incident`,
        action: 'request',
      });
    } else {
      res
        .status(403)
        .json({ response_string: 'Something Went Wrong', action: 'end' });
    }
  },
  menuOne: async (req, res) => {
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
  menuTwo: async (req, res) => {
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
  menuThree: async (req, res) => {
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
  menuFour: async (req, res) => {
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
  menuFive: async (req, res) => {
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
  menuSix: async (req, res) => {
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
          // Capture the case type
          switch (request_string) {
            case '1':
              dataArray[i].type = 'Bad touches';
              break;
            case '2':
              dataArray[i].type = 'I was raped';
              break;
            case '3':
              dataArray[i].type = 'I was defiled';
              break;
            case '4':
              dataArray[i].type = 'Someone tried to raped me';
              break;
            case '5':
              dataArray[i].type = 'Other';
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
  menuSeven: async (req, res) => {
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
        response_string:
          'Select your region. \n 1. Central \n 2. Eastern \n 3. Western \n 4. Northern \n 0. Back',
        action: 'request',
      });
    } else {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },

  menuEight: (req, res) => {
    const { request_string } = req.body;

    try {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the case type
          switch (request_string) {
            case '1':
              dataArray[i].region = 'Central';
              break;
            case '2':
              dataArray[i].region = 'Eastern';
              break;
            case '3':
              dataArray[i].region = 'Western';
              break;
            case '4':
              dataArray[i].region = 'Northern';
              break;
            default:
          }
          dataArray[i].menu = 9;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      if (request_string === '1') {
        checkSessionId(9, req, dataArray);
        res.status(200).json({
          response_string:
            'Select your District \n 1. Kampala \n 2. Wakiso \n 3. Masaka \n 4. Mukono \n 5. Kayunga \n 6. Mityana \n 7. Luwero \n 8. Others',
          action: 'request',
        });
      } else if (request_string === '2') {
        checkSessionId(9, req, dataArray);
        res.status(200).json({
          response_string:
            'Select your District \n 1. Jinja \n 2. Mbale \n 3. Kamuli \n 4. Iganga \n 5. Bugiri \n 6. Tororo \n 7. Soroti \n 8. Others',
          action: 'request',
        });
      } else if (request_string === '3') {
        checkSessionId(9, req, dataArray);
        res.status(200).json({
          response_string:
            'Select your District \n 1. Mbarara \n 2. Kibaale \n 3. Kasese \n 4. Isingiro \n 5. Kabarole \n 6. Kamwenge \n 7. Ntungamo \n 8. Others',
          action: 'request',
        });
      } else if (request_string === '4') {
        checkSessionId(9, req, dataArray);
        res.status(200).json({
          response_string:
            'Select your District \n 1. Arua \n 2. Lira \n 3. Gulu \n 4. Kitgum \n 5. Abim \n 6. Moroto \n 7. Adjumani \n 8. Others',
          action: 'request',
        });
      }
    } catch (error) {
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
  menuNine: async (req, res) => {
    const { request_string } = req.body;

    console.log('Type of request string', typeof request_string);

    try {
      let userReport;
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // delete the menu property
          delete dataArray[i].menu;
          userReport = dataArray[i];
        } else {
          console.log("could not find User's SessionID");
        }
      }

      console.log(userReport);

      // Set location
      userReport.location = regions
        .filter((r) => r.region === userReport.region)
        // Subtract 1 coz array is 0 indexed
        .map((d) => d.districts)[0][request_string - 1];

      //   1- Send the report to the safepal platform
      const response = await sendReportToAPI(userReport);
      const { status, casenumber } = response;

      if (status) {
        res.status(200).json({
          response_string: `Your SafePal Number is: ${casenumber}. SafePal will contact you soon`,
          action: 'end',
        });

        // send an sms
        const body = `We've received your report. Your Safepal number is ${casenumber}. Please keep this for record purposes. SafePal will contact you shortly.`;
        const toPhoneNumber = `+${userReport.phoneNumber}`;
        const failMsg = `An error occurred while sending SMS to ${userReport.phoneNumber}`;

        const smsResult = await sendSMS({
          body,
          toPhoneNumber,
          failMsg,
        });

        if (smsResult) {
          // Silent pass. No need to do anything
        } else {
          // Just log the error for now but maybe figure out later how to deal with this.
          console.log(`${failMsg}`.red.underline);
        }

        // delete the UserData Object
        for (let i = 0; i < dataArray.length; i += 1) {
          if (dataArray[i].sessionID === req.body.session_id) {
            dataArray.splice(i, 1);
          } else {
            console.log("could not find User's SessionID");
          }
        }
      } else {
        res.status(403).json({
          response_string:
            'We are sorry, something went wrong. Please try again',
          action: 'end',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ response_string: 'Invalid Input', action: 'end' });
    }
  },
};

module.exports = menuOptions;
