import { database } from "firebase-functions";
//import logger from "../logging/logger";
import { queryCachedExchangeRate } from "../exchangeRate/cachedExchangeRate";

export default database
  .ref("/bids/{bid}")
  .onCreate(async (snapshot, context) => {
    const { rate } = await queryCachedExchangeRate();
    const original = snapshot.val();
    await snapshot.ref.child("uid").set(context.auth?.uid);
    await snapshot.ref.child("local").set(original.dollars * rate);
    await snapshot.ref.child("timestamp").set(new Date().getTime());
    return snapshot;
  });
