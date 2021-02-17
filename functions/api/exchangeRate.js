const errorHandler = require("./util/error-handling");
const { queryExchangeRate } = require("./interop/bcu");

async function exchangeRate(req, res, next) {
	try {
		const response = await queryExchangeRate();
		const exchangeRate = response.cotizacionesoutlist.Cotizaciones[0];
		res.json({
			rate: exchangeRate.TCC,
			date: parseTimeStamp(exchangeRate.Fecha),
		});
	} catch (error) {
		next(error);
	}
}

function parseTimeStamp(input) {
	return parseInt(input.match(/\/Date\((\d+)\)/)[1], 10);
}

module.exports = [exchangeRate, errorHandler];
