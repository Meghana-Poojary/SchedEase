import { Amplify } from "aws-amplify";
import { studentAmplifyConfig } from "./student-config";
import { adminAmplifyConfig } from "./admin-config";

export const configureAmplifyForRole = (role) => {
  if (role === "admin") {
    Amplify.configure(adminAmplifyConfig);
  } else {
    Amplify.configure(studentAmplifyConfig);
  }
};
