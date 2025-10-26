export const adminAmplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_ADMIN_POOL_ID, 
      userPoolClientId: import.meta.env.VITE_ADMIN_CLIENT_ID, 
      signUpVerificationMethod: "code",
      loginWith: { username: false, email: true },
    },
  },
};
