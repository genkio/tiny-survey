import "./fix-ts-paths";

import * as functions from "firebase-functions";
import server from "./server";

export const api = functions.region("asia-northeast1").https.onRequest(server);
