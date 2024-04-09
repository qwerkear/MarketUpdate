// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });
const axios = require('axios')
let {data} = await axios.get('https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0L1E', {responseType: 'JSON'})

export const handler = async(event) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["qwer.kear@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: data },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "qwer.kear@gmail.com",
  });

  try {
    let response = await ses.send(command);
    // process data.
    return response;
  }
  catch (error) {
    // error handling.
    console.log(error)
    return ses.send(500)
  }
  finally {
    // finally.
  }
};