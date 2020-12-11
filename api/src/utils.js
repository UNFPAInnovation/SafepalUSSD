/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const AfricasTalking = require('africastalking');

const config = (method, url, data) => {
  return {
    method: method === 'get' ? 'get' : 'post',
    url,
    headers: {
      userid: process.env.SAFEPAL_API_USERID,
      'Content-Type': 'application/json',
    },
    data,
  };
};

const getAPIToken = async () => {
  const data = JSON.stringify({
    hash: process.env.SAFEPAL_API_HASH,
    username: process.env.SAFEPAL_API_USERNAME,
  });
  try {
    const _data = await axios(
      config(
        'get',
        `${process.env.SAFEPAL_API_SERVER}api/v1/auth/newtoken`,
        data
      )
    );
    const { token } = _data.data;

    return token;
  } catch (error) {
    console.log(error);
  }
};

const sendReportToAPI = async (report) => {
  const data = JSON.stringify({
    token: await getAPIToken(),
    ...report,
  });

  try {
    const _data = await axios(
      config(
        'post',
        `${process.env.SAFEPAL_API_SERVER}api/v1/reports/addreport`,
        data
      )
    );

    const { status, casenumber } = _data.data;

    return { status, casenumber };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const credentials = async () => {
  return {
    username: process.env.AIT_USERNAME,
    apiKey: process.env.AIT_API_KEY_LIVE,
  };
};

const africasTalking = async () => {
  const credentialsToUse = await credentials();
  return new AfricasTalking(credentialsToUse);
};

const sendSMS = async ({ body, toPhoneNumber, failMsg }) => {
  const smsObject = await africasTalking();
  const sms = smsObject.SMS;
  const smsResult = await sms
    .send({
      to: toPhoneNumber,
      message: body,
    })
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return smsResult;
};

module.exports = {
  getAPIToken,
  sendReportToAPI,
  sendSMS,
};
