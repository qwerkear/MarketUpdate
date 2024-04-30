// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });
import axios from 'axios'

export const handler = async(event) => {
  let {data} = await axios.get('https://api.bls.gov/publicAPI/v2/timeseries/data/CUUR0000SA0L1E', {responseType: 'JSON'})
  const cpiJson = JSON.parse(data);
  const thisMonthsCPI = JSON.stringify(cpiJson.Results.series[0].data[0])

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["qwer.kear@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: thisMonthsCPI },
      },

      Subject: { Data: "CPI Email" },
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