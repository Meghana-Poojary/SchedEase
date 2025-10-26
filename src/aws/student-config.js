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
