// src/awsConfig.js
import { Amplify } from "aws-amplify";

const studentAuthConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_vWZ0AThLv",
    userPoolWebClientId: "3iugn05bon2unut09ecpsjo18c",
    mandatorySignIn: true,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
};

const adminAuthConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_e2hbQW3o4",
    userPoolWebClientId: "1c75ra8n7asg53347sll0f6fd1",
    mandatorySignIn: true,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
};

// Export configs and a helper to switch between them
export const configureAuth = (role) => {
  if (role === "admin") Amplify.configure(adminAuthConfig);
  else Amplify.configure(studentAuthConfig);
};
