// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });

export const handler = async(event) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["qwer.kear@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "Test" },
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
  }
  finally {
    // finally.
  }
};