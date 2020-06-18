import React from "react";
import { Link } from "react-router-dom";
import { getClassesByType } from "./styling";

function ButtonLink({ type, mode, className, children, ...props }) {
	const { textColor, backgroundColor } = getColorClasses(type, mode);
	return (
		<Link
			className={[
				"btn text-center",
				className,
				textColor,
				backgroundColor,
			].join(" ")}
			{...props}
		>
			{children}
		</Link>
	);
}

function Button({ type, mode, buttonType, className, children, ...props }) {
	const { textColor, backgroundColor } = getColorClasses(type, mode);

	return (
		<BasicButton
			className={[className, textColor, backgroundColor].join(" ")}
			type={buttonType}
			{...props}
		>
			{children}
		</BasicButton>
	);
}

function getColorClasses(type, mode) {
	const {
		textColor,
		textColorInverse,
		backgroundColor,
		backgroundColorInverse,
	} = getClassesByType(type);
	return {
		textColor: mode === "inverse" ? textColorInverse : textColor,
		backgroundColor:
			mode === "inverse" ? backgroundColorInverse : backgroundColor,
	};
}

function TextButton({ type, buttonType, className, children, ...props }) {
	const { textColor } = getClassesByType(type);

	return (
		<BasicButton
			type={buttonType}
			className={[className, textColor].join(" ")}
			{...props}
		>
			{children}
		</BasicButton>
	);
}

function BasicButton({ type, buttonType, className, children, ...props }) {
	return (
		<button
			type={buttonType}
			className={`${className} btn disabled:opacity-75 disabled:cursor-not-allowed`}
			{...props}
		>
			{children}
		</button>
	);
}

export { Button, TextButton, ButtonLink };
