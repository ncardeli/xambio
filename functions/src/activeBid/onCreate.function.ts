import { database } from "firebase-functions";
//import logger from "../logging/logger";
import { queryCachedExchangeRate } from "../exchangeRate/cachedExchangeRate";

export default database
  .ref("/bids/{bid}")
  .onCreate(async (snapshot, context) => {
    const { rate } = await queryCachedExchangeRate();
    const original = snapshot.val();
    return snapshot.ref.set({
      ...original,
      local: original.dollars * rate,
      timestamp: new Date().getTime(),
    });
  });
