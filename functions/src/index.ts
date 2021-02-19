// @ts-ignore
import * as loadFunctions from "firebase-function-tools";
import * as admin from "firebase-admin";
// This import is needed by admin.initializeApp() to get the project info (Database url, project id, etc)
// @ts-ignore
import * as functions from "firebase-functions";

import exchangeRate from "./exchangeRate/onRequest.function";
import activeBid from "./bids/onCreate.function";
import userCreate from "./auth/onCreate.function";
import userUpdate from "./users/onUpdate.function";

admin.initializeApp();

//loadFunctions(__dirname, exports, ".function.js");

export { activeBid, exchangeRate, userCreate, userUpdate };
