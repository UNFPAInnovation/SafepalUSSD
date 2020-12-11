/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const axios = require('axios');

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

  //   const config = (method, url, data) = {
  //     method: method === "get" ? get : "post",
  //     url: `${process.env.SAFEPAL_API_SERVER}api/v1/auth/newtoken`,
  //     // url,
  //     headers: {
  //       userid: process.env.SAFEPAL_API_USERID,
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   };

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

  //   const config = {
  //     method: 'post',
  //     url: `${process.env.SAFEPAL_API_SERVER}api/v1/reports/addreport`,
  //     headers: {
  //       userid: process.env.SAFEPAL_API_USERID,
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   };

  try {
    console.log(`Inside try`);

    const _data = await axios(
      config(
        'post',
        `${process.env.SAFEPAL_API_SERVER}api/v1/reports/addreport`,
        data
      )
    );

    const { status, casenumber } = _data.data;

    console.log(status, casenumber);

    return { status, casenumber };
  } catch (error) {
    console.log(`Inside catch`);

    console.log(error);
    return error;
  }
};

const sendSMS = async (params) => {};

module.exports = {
  getAPIToken,
  sendReportToAPI,
};
