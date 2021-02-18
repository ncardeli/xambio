import { https } from "firebase-functions";
import { queryExchangeRate } from "./bcu";

const isProduction = process.env.NODE_ENV === "production";

export default https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    const exchangeRateResponse = await queryExchangeRate();
    const exchangeRate =
      exchangeRateResponse.cotizacionesoutlist.Cotizaciones[0];
    res.json({
      data: {
        rate: exchangeRate.TCC,
        date: parseTimeStamp(exchangeRate.Fecha),
      },
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
