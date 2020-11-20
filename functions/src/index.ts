import * as functions from "firebase-functions";
import app from "./app";

// import * as admin from "firebase-admin";
// admin.initializeApp();

// (async () => {
//   const config = await admin.remoteConfig();
//   console.log(config);
// })();

export const api = functions.region("asia-northeast1").https.onRequest(app);
