const BACKGROUND_COLOR_BY_TYPE = {
	sell: "red-400",
	buy: "green-700",
	main: "white",
};

const BACKGROUND_COLOR_INVERSE_BY_TYPE = {
	sell: "white",
	buy: "white",
	main: "gray-800",
};

const TEXT_COLOR_BY_TYPE = {
	sell: "white",
	buy: "white",
	main: "gray-800",
};

const TEXT_COLOR_INVERSE_BY_TYPE = {
	sell: "red-400",
	buy: "green-700",
	main: "white",
};

function backgroundColorByType(type) {
	return `bg-${BACKGROUND_COLOR_BY_TYPE[type]}`;
}

function backgroundColorInverseByType(type) {
	return `bg-${BACKGROUND_COLOR_INVERSE_BY_TYPE[type]}`;
}

function textColorByType(type) {
	return `text-${TEXT_COLOR_BY_TYPE[type]}`;
}

function textColorInverseByType(type) {
	return `text-${TEXT_COLOR_INVERSE_BY_TYPE[type]}`;
}

function borderColorByType(type) {
	return `border-${BACKGROUND_COLOR_BY_TYPE[type]}`;
}

function getClassesByType(type) {
	return {
		backgroundColor: backgroundColorByType(type),
		backgroundColorInverse: backgroundColorInverseByType(type),
		borderColor: borderColorByType(type),
		textColor: textColorByType(type),
		textColorInverse: textColorInverseByType(type),
	};
}

export { getClassesByType };
