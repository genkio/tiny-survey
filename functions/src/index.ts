import "./fix-ts-paths";

import * as functions from "firebase-functions";
import app from "./app";

export const api = functions.region("asia-northeast1").https.onRequest(app);
