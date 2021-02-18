import { https } from "firebase-functions";
import { queryCachedExchangeRate } from "./cachedExchangeRate";

const isProduction = process.env.NODE_ENV === "production";

export default https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    const data = await queryCachedExchangeRate();

    res.json({
      data,
    });
  } catch (error) {
    res.status(500);

    const errorOutput = {
      error:
        error.outputMessage ||
        "There was an unexpected error while processing your request",
      details: error.details,
    };

    if (isProduction) {
      res.json(errorOutput);
    } else {
      res.json({
        ...errorOutput,
        stack: error.stack,
      });
    }
  }
});
