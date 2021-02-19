import { queryExchangeRate } from "./bcu";
import { Cache } from "../util/cache";
import FirebaseRtdbCache from "../util/rtdb-cache";

const cache: Cache = new FirebaseRtdbCache(300);

export async function queryCachedExchangeRate(): Promise<{
  rate: number;
  date: number;
}> {
  return await cache.get("exchange-rate", async () => {
    const exchangeRateResponse = await queryExchangeRate();
    const exchangeRate =
      exchangeRateResponse.cotizacionesoutlist.Cotizaciones[0];
    return {
      rate: exchangeRate.TCC,
      date: parseTimeStamp(exchangeRate.Fecha),
    };
  });
}

function parseTimeStamp(input: string) {
  const matchResult = input.match(/\/Date\((\d+)\)/);
  if (matchResult === null) {
    throw new Error("Unable to parse the exchange rate timestamp");
  }

  return Number(matchResult[1]);
}
