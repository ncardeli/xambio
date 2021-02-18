import { https } from "firebase-functions";
import { queryExchangeRate } from "./bcu";
import { Cache } from "../util/cache";
import FirebaseRtdbCache from "../util/rtdb-cache";

const isProduction = process.env.NODE_ENV === "production";

export default https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const cache: Cache = new FirebaseRtdbCache(300);

  try {
    const data = await cache.get("exchange-rate", async () => {
      const exchangeRateResponse = await queryExchangeRate();
      const exchangeRate =
        exchangeRateResponse.cotizacionesoutlist.Cotizaciones[0];
      return {
        rate: exchangeRate.TCC,
        date: parseTimeStamp(exchangeRate.Fecha),
      };
    });

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

function parseTimeStamp(input: string) {
  const matchResult = input.match(/\/Date\((\d+)\)/);
  if (matchResult === null) {
    throw new Error("Unable to parse the exchange rate timestamp");
  }

  return Number(matchResult[1]);
}
