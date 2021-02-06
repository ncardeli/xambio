const express = require("express");
const appLogger = require("../logging/logger");
const exchangeRate = require("./exchangeRate");

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";

router.get("/exchange-rate", exchangeRate);

// Custom error handling
router.use(function (err, req, res, next) {
	const status = err.status || 500;
	res.locals.message = err.message;
	res.locals.error = isProduction ? {} : err;

	appLogger.error(
		`${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
	);

	// render the error page
	res.status(status || 500);
	const errorOutput = {
		error:
			err.outputMessage ||
			"There was an unexpected error while processing your request",
		details: err.details,
	};

	if (isProduction) {
		res.json(errorOutput);
	} else {
		res.json({
			...errorOutput,
			stack: err.stack,
		});
	}
});

module.exports = router;
