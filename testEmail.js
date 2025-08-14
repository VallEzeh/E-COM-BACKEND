// testEmail.js
import sendEmail from "./sendEmail.js";
import dotenv from "dotenv";
dotenv.config();
// Make sure the path is correct

// Test function
const runTest = async () => {
  await sendEmail(
    "ezemegwaraebuka@gmail.com", // Change to your test email
    "Test Email from Node.js",
    "<h1>Hello!</h1><p>This is a test email.</p>"
  );
};

runTest();
