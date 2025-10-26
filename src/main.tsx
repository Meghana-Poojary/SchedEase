import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { Amplify } from "aws-amplify";
// import { configureAmplifyForRole } from "./aws/amplifyClient.js";

// Amplify.configure(configureAmplifyForRole);

createRoot(document.getElementById("root")!).render(<App />);
