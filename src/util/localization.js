export function currencyToFormattedString(currency, amount) {
	return Intl.NumberFormat(
		getLocale(),
		getNumberFormatOptions(currency)
	).format(amount);
}

export function currencyToFormatParts(currency, amount) {
	const numberFormat = Intl.NumberFormat(
		getLocale(),
		getNumberFormatOptions(currency)
	);
	if (numberFormat.formatToParts) {
		return numberFormat.formatToParts(amount);
	}
	return null;
}

function getNumberFormatOptions(currency) {
	return {
		style: "currency",
		currency,
		useGrouping: true,
	};
}

function getLocale() {
	return "es-UY";
}

export function dateToFormattedString(date) {
	return date.toLocaleDateString(getLocale(), {
		dateStyle: "medium",
	});
}
