import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

const snsClient = new SNSClient({ region: "us-east-1" });
const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

// Replace with your own
const USER_POOL_ID = "us-east-1_vWZ0AThLv";  // <-- your Cognito User Pool ID
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:163172972658:SNS";  // <-- your SNS topic ARN

export const handler = async (event) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const { eventName, date, time, location, description } = event;

    const message = `
Event: ${eventName}
Date: ${date}
Time: ${time}
Venue: ${location}
Description: ${description}

– Team Feedback Catalyst
`;

    // Get all users with phone numbers from Cognito
    const usersResponse = await cognitoClient.send(
      new ListUsersCommand({
        UserPoolId: USER_POOL_ID,
        AttributesToGet: ["phone_number"],
      })
    );

    const phoneNumbers = usersResponse.Users
      .map((u) => u.Attributes?.find((a) => a.Name === "phone_number")?.Value)
      .filter(Boolean);

    console.log("Sending SMS to:", phoneNumbers);

    for (const number of phoneNumbers) {
      await snsClient.send(
        new PublishCommand({
          Message: message,
          PhoneNumber: number,
        })
      );
    }

    // Publish message to SNS Topic (for emails)
    await snsClient.send(
      new PublishCommand({
        TopicArn: SNS_TOPIC_ARN,
        Subject: `New Event: ${eventName}`,
        Message: message,
      })
    );

    return { statusCode: 200, body: "SNS notifications sent successfully!" };
  } catch (err) {
    console.error("Error:", err);
    return { statusCode: 500, body: err.message };
  }
};

