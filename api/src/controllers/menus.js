/* eslint-disable no-console */
/* eslint-disable camelcase */
/* This Module contains the USSD menus */
const { dataArray, checkSessionId } = require("../db");
const { sendReportToAPI, sendSMS, regions } = require("../utils");

let salutation = "you"
let salutation2 = "your"

let gender = "you"
let gender2 = "your"

const menuOptions = {
  menuZero: async (req, res) => {
    const { request_string } = req.body;

    if (request_string === "6") {
      // checks for session_id and then assigns next menu
      checkSessionId(1, req, dataArray);
      res.status(200).json({
        response_string: `We are here for you, talk to us about sexual violence \n 1. Report an incident`,
        action: "request",
      });
    } else {
      res
        .status(403)
        .json({ response_string: "Something Went Wrong", action: "end" });
    }
  },

  menuZeroOne: async (req, res) => {
    const { request_string} = req.body;
    if (request_string === "1") {
      // checks for session_id and then assigns next menu
      checkSessionId(0.2, req, dataArray);
      res.status(200).json({
        response_string: `Would you want to add an alternative number? \n 1. No \n 2. Yes `,
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },

  menuZeroTwo: async (req, res) => {
    const { request_string } = req.body;
    if (request_string === "1") {
      // checks for session_id and then assigns next menu
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray[i].menu = 2;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string: "Did the incident happen to you? \n 1. No \n 2. Yes ",
        action: "request",
      });
    } else if (request_string === "2") {
      checkSessionId(0.3, req, dataArray);
      res.status(200).json({
        response_string: `Enter Phone Number (e.g. 0712345675)`,
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },

  menuZeroThree: async (req, res) => {
    const { request_string } = req.body;
    const phone_pattern =
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/im;
    const isvalid = phone_pattern.test(request_string);

    if (isvalid) {
      // checks for session_id and then assigns next menu
      req.body.phone_number = request_string;
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture phone  number
          dataArray[i].contact = request_string;
          dataArray[i].menu = 9;
        } else {
          console.log("could not find User's SessionID");
        }
      }
 
      res.status(200).json({
        response_string: "Comfirm your submission \n 1. Yes ",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },

  menuOne: async (req, res) => {
    const { request_string } = req.body;
    console.log("MenuTwo");
    // var salutation = "you"
    console.log(salutation);
    if (request_string === "1") {
      // checks for session_id and then assigns next menu
      checkSessionId(2, req, dataArray);
      res.status(200).json({
        response_string: "Did the incident happen to you? \n 1. No \n 2. Yes ",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input \n 1. Report an incident ", action: "end" });
    }
  },
  menuTwo: async (req, res) => {
    const { request_string } = req.body;
    salutation = request_string ==='1' ? 'him/her': "you"
    salutation2 = request_string ==='1' ? 'his/her': "your"
    
    if (request_string === "1") {
      // checks for session_id and then assigns next menu
      checkSessionId(3, req, dataArray);
      res.status(200).json({
        response_string:
          `How are you related to ${salutation} \n 1. Relative \n 2. Friend \n 3. School Mate \n 4. Other`,
        action: "request",
      });
    } else if (request_string === "2") { 
      // salutation = request_string ==='1' ? 'his/her': "your"
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray[i].menu = 4;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string: `What's ${salutation2} Gender? \n 1. Male \n 2. Female`,
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input \n Did the incident happen to you? \n 1. No \n 2. Yes  ", action: "end" });
    }
  },
  menuThree: async (req, res) => {
    const { request_string } = req.body;

    if (
      request_string === "1" ||
      request_string === "2" ||
      request_string === "3" ||
      request_string === "4"
    ) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the reporter_relationship
          switch (request_string) {
            case "1":
              dataArray[i].reporter_relationship = "Relative";
              break;
            case "2":
              dataArray[i].reporter_relationship = "Friend";
              break;
            case "3":
              dataArray[i].reporter_relationship = "School Mate";
              break;
            case "4":
              dataArray[i].reporter_relationship = "Other";
              break;
            default:
          }
          dataArray[i].menu = 4.1;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      res.status(200).json({
        response_string: "What's his/her Gender? \n 1. Male \n 2. Female",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: `Invalid Input \n How are you related to ${salutation} \n 1. Relative \n 2. Friend \n 3. School Mate \n 4. Other`, action: "end" });
    }
  },
  menuFour: async (req, res) => {
    const { request_string } = req.body;
    if (request_string === "1" || request_string === "2") {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture Gender
          if (request_string === "1") {
            dataArray[i].gender = "Male";
          } else {
            dataArray[i].gender = "Female";
          }
          dataArray[i].menu = 5;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string:
          "Do you have any disability? \n 1. No \n 2. Yes",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },
  menuFourOne: async (req, res) => {
    const { request_string } = req.body;
    gender = request_string ==="1" ? "him" : "her"
    gender2 = request_string ==="1" ? "his" : "her"
    if (request_string === "1" || request_string === "2") {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture Gender
          if (request_string === "1") {
            dataArray[i].gender = "Male";
          } else {
            dataArray[i].gender = "Female";
          }
          dataArray[i].menu = 5;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string:
          "Does the victim have any disability? \n 1. No \n 2. Yes",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },
  menuFive: async (req, res) => {
    const { request_string } = req.body;
    // salutation ? 'his/her': "you"

    if (request_string === "1") {
      // checks for session_id and then assigns next menu
      checkSessionId(6, req, dataArray);
      console.log(gender) ;
      
      res.status(200).json({
        response_string:
          `What happened to ${gender}? \n 1. Child Exploitation \n 2. Child Neglect \n 3. Child Trafficking \n 4. Emotional Abuse \n 5. Physical Abuse \n 6. Sexual Abuse \n 7. Murder \n 8. Online Child Sexual Abuse & Exploitation (OCSAE) \n 9. Other`,
          action: "request",
      });
    } else if (request_string === "2") {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          dataArray[i].menu = 5.1;
        } else {
          console.log("could not find User's SessionID");
        }
      }
      res.status(200).json({
        response_string:
          "Specify the type of disability.  \n 1. Hearing \n 2. Visual \n 3. Physical \n 4. Motor \n 5. Mental \n 6. Intellectual",
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },
  menuFiveOne: async (req, res) => {
    const { request_string } = req.body;
    // salutation ? 'his/her': "your"
    if (
      request_string === "1" ||
      request_string === "2" ||
      request_string === "3" ||
      request_string === "4" ||
      request_string === "5" ||
      request_string === "6"
    ) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the reporter_relationship
          switch (request_string) {
            case "1":
              dataArray[i].disability_type = "Hearing";
              break;
            case "2":
              dataArray[i].disability_type = "Visual";
              break;
            case "3":
              dataArray[i].disability_type = "Physical";
              break;
            case "4":
              dataArray[i].disability_type = "Motor";
              break;
            case "5":
              dataArray[i].disability_type = "Mental";
              break;
            case "6":
              dataArray[i].disability_type = "Intellectual";
              break;

            default:
          }
          dataArray[i].menu = 6;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      res.status(200).json({
        response_string:
          `What happened to ${gender}? \n 1. Child Exploitation \n 2. Child Neglect \n 3. Child Trafficking \n 4. Emotional Abuse \n 5. Physical Abuse \n 6. Sexual Abuse \n 7. Murder \n 8. Online Child Sexual Abuse & Exploitation (OCSAE) \n 9. Other`,
          action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },
  menuSix: async (req, res) => {
    const { request_string } = req.body;
    // salutation ? 'his/her': "your"
    if (
      request_string === "1" ||
      request_string === "2" ||
      request_string === "3" ||
      request_string === "4" ||
      request_string === "5" ||
      request_string === "6" ||
      request_string === "7" ||
      request_string === "8" ||
      request_string === "9"
    ) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the case type
          switch (request_string) {
            case "1":
              dataArray[i].case_type = "Child Exploitation";
              break;
            case "2":
              dataArray[i].case_type = "Child Neglect";
              break;
            case "3":
              dataArray[i].case_type = "Child Trafficking";
              break;
            case "4":
              dataArray[i].case_type = "Emotional Abuse";
              break;
            case "5":
              dataArray[i].case_type = "Physical Abuse";
              break;
            case "6":
              dataArray[i].case_type = "Sexual Abuse";
              break;
            case "7":
              dataArray[i].case_type = "Murder";
              break;
            case "8":
              dataArray[i].case_type =
                "Online Child Sexual Abuse & Exploitation (OCSAE)";
              break;
            case "9":
              dataArray[i].case_type = "Other";
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
        .json({ response_string: `Enter ${gender2} Age`, action: "request" });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },
  menuSeven: async (req, res) => {
    const { request_string } = req.body;
    // salutation = request_string ==='1' ? 'his/her': "your"
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
          `Select ${gender2} region. \n 1. Central \n 2. Eastern \n 3. Western \n 4. Northern `,
        action: "request",
      });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },

  menuEight: (req, res) => {
    const { request_string } = req.body;
    // salutation = request_string ==='1' ? 'his/her': "your"
    try {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // Capture the case type
          switch (request_string) {
            case "1":
              dataArray[i].region = "Central";
              break;
            case "2":
              dataArray[i].region = "Eastern";
              break;
            case "3":
              dataArray[i].region = "Western";
              break;
            case "4":
              dataArray[i].region = "Northern";
              break;
            default:
          }
          dataArray[i].menu = 8.1;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      if (request_string === "1") {
        checkSessionId(8.1, req, dataArray);
        res.status(200).json({
          response_string:
            `Select ${gender2} District \n 1. Kampala \n 2. Wakiso \n 3. Masaka \n 4. Mukono \n 5. Kayunga \n 6. Mityana \n 7. Luwero \n 8. Others`,
          action: "request",
        });
      } else if (request_string === "2") {
        checkSessionId(8.1, req, dataArray);
        res.status(200).json({
          response_string:
            `Select ${gender2} District \n 1. Jinja \n 2. Mbale \n 3. Kamuli \n 4. Iganga \n 5. Bugiri \n 6. Tororo \n 7. Soroti \n 8. Others`,
          action: "request",
        });
      } else if (request_string === "3") {
        checkSessionId(8.1, req, dataArray);
        res.status(200).json({
          response_string:
            `Select ${gender2} District \n 1. Mbarara \n 2. Kibaale \n 3. Kasese \n 4. Isingiro \n 5. Kabarole \n 6. Kamwenge \n 7. Ntungamo \n 8. Others`,
          action: "request",
        });
      } else if (request_string === "4") {
        checkSessionId(8.1, req, dataArray);
        res.status(200).json({
          response_string:
            `Select ${gender2} District \n 1. Arua \n 2. Lira \n 3. Gulu \n 4. Kitgum \n 5. Abim \n 6. Moroto \n 7. Adjumani \n 8. Others`,
          action: "request",
        });
      }
    } catch (error) {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
    }
  },

  menuEightOne: async (req, res) => {
    const { request_string } = req.body;

    // salutation = request_string ==='1' ? 'his/her': "your"
    for (let i = 0; i < dataArray.length; i += 1) {
      if (dataArray[i].sessionID === req.body.session_id) {
        // Capture the district

        if (dataArray[i].region === "Central") {
          switch (request_string) {
            case "1":
              dataArray[i].district = "Kampala";
              break;
            case "2":
              dataArray[i].district = "Wakiso";
              break;
            case "3":
              dataArray[i].district = "Masaka";
              break;
            case "4":
              dataArray[i].district = "Mukono";
              break;
            case "5":
              dataArray[i].district = "Kayunga";
              break;
            case "6":
              dataArray[i].district = "Mityana";
              break;
            case "7":
              dataArray[i].district = "Luwero";
              break;
            case "8":
              dataArray[i].menu = 8.2;
              break;
            default:
              dataArray[i].district = null;
              break;
          }
        } else if (dataArray[i].region === "Eastern") {
          switch (request_string) {
            case "1":
              dataArray[i].district = "Jinja";
              break;
            case "2":
              dataArray[i].district = "Mbale";
              break;
            case "3":
              dataArray[i].district = "Kamuli";
              break;
            case "4":
              dataArray[i].district = "Iganga";
              break;
            case "5":
              dataArray[i].district = "Bugiri";
              break;
            case "6":
              dataArray[i].district = "Tororo";
              break;
            case "7":
              dataArray[i].district = "Soroti";
              break;
            case "8":
              dataArray[i].menu = 8.2;
              break;
            default:
              dataArray[i].district = null;
              break;
          }
        } else if (dataArray[i].region === "Western") {
          switch (request_string) {
            case "1":
              dataArray[i].district = "Mbarara";
              break;
            case "2":
              dataArray[i].district = "Kibaale";
              break;
            case "3":
              dataArray[i].district = "Kasese";
              break;
            case "4":
              dataArray[i].district = "Isingiro";
              break;
            case "5":
              dataArray[i].district = "Kabarole";
              break;
            case "6":
              dataArray[i].district = "Kamwenge";
              break;
            case "7":
              dataArray[i].district = "Ntungamo";
              break;
            case "8":
              dataArray[i].menu = 8.2;
              break;
            default:
              dataArray[i].district = null;
              break;
          }
        } else if (dataArray[i].region === "Northern") {
          switch (request_string) {
            case "1":
              dataArray[i].district = "Arua";
              break;
            case "2":
              dataArray[i].district = "Lira";
              break;
            case "3":
              dataArray[i].district = "Gulu";
              break;
            case "4":
              dataArray[i].district = "Kitgum";
              break;
            case "5":
              dataArray[i].district = "Abim";
              break;
            case "6":
              dataArray[i].district = "Moroto";
              break;
            case "7":
              dataArray[i].district = "Adjumani";
              break;
            case "8":
              dataArray[i].menu = 8.2;
              break;
            default:
              dataArray[i].district = null;
              break;
          }
        
        } else {
          res
            .status(403)
            .json({ response_string: "Invalid Input", action: "end" });
        }

        // response
        if (req.body.request_string === "8") {
          res.status(200).json({
            response_string: "Enter District",
            action: "request",
          });
        } else {
          res
          .status(200)
          .json({ response_string: "Enter alternative phone number", action: "request" });
        dataArray[i].menu = 0.3;
        }
      } else {
        console.log("could not find User's SessionID");
      }
    }
  },

  menuEightTwo: async (req, res) => {
    const { request_string } = req.body;
    if (request_string.length !== 0) {
      for (let i = 0; i < dataArray.length; i += 1) {
        if (dataArray[i].sessionID === req.body.session_id) {
          // capture district
          dataArray[i].district = request_string;
          dataArray[i].menu = 0.3;
        } else {
          console.log("could not find User's SessionID");
        }
      }

      res
        .status(200)
        .json({ response_string: "Enter alternative phone number", action: "request" });
    } else {
      res.status(403).json({ response_string: "Invalid Input", action: "end" });
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
