const axios = require("axios").default;
const logger = require("../../logging/logger");
const Cache = require("./cache");

const BCU_EXCHANGE_RATE_URL =
	"https://www.bcu.gub.uy/_layouts/BCU.Cotizaciones/handler/CotizacionesHandler.ashx?op=getcotizaciones";

const cache = new Cache(process.env.CACHE_TTL_SECONDS || 300);
const MAX_QUERY_EXCHANGE_RATE_RETRIES = 15;

async function queryExchangeRate() {
	let date = new Date();
	for (let i = 0; i < MAX_QUERY_EXCHANGE_RATE_RETRIES; i++) {
		const result = await fetchBcuApi(BCU_EXCHANGE_RATE_URL, date);
		if (result.cotizacionesoutlist.RespuestaStatus.status === 1) {
			return result;
		}
		date.setDate(date.getDate() - 1);
	}
}

async function fetchBcuApi(url, date) {
	try {
		const todayDay = date.getDate().toString().padStart(2, "0");
		const todayMonth = (date.getMonth() + 1).toString().padStart(2, "0");
		const todayYear = date.getFullYear();
		const todayString = `${todayDay}/${todayMonth}/${todayYear}`;
		const result = await cache.get(url + todayString, async () => {
			const payload = {
				KeyValuePairs: {
					Monedas: [{ Val: "2225", Text: "DLS. USA BILLETE" }],
					FechaDesde: todayString,
					FechaHasta: todayString,
					Grupo: "2",
				},
			};
			logger.info(
				`Fetching data from BCU's endpoint (${url}) - (${JSON.stringify(
					payload
				)})`
			);
			const response = await axios.post(url, payload);
			logger.info(
				`Received data from BCU's endpoint (${JSON.stringify(response.data)})`
			);
			return response.data;
		});
		return result;
	} catch (e) {
		logger.error(`Error fetching data from BCU's endpoint (${url})`, e);
		throw e;
	}
}

module.exports = {
	queryExchangeRate,
};
