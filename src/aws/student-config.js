export const studentAmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_STUDENT_POOL_ID, 
      userPoolClientId: import.meta.env.VITE_STUDENT_CLIENT_ID, 
      signUpVerificationMethod: "code",
      loginWith: { username: false, email: true },
    },
  },
};

// export const studentAmplifyConfig = {
//   Auth: {
//     userPoolId: import.meta.env.VITE_STUDENT_POOL_ID, 
//     userPoolClientId: import.meta.env.VITE_STUDENT_CLIENT_ID, 
//     region: us-east-1, // you must specify the region
//     authenticationFlowType: "USER_PASSWORD_AUTH",
//   },
// };