import React from "react";
import { Link } from "react-router-dom";
import { getClassesByType } from "./styling";

function ButtonLink({ type, className, children, ...props }) {
	const { textColorInverse } = getClassesByType(type);
	return (
		<Link
			className={[
				"btn text-center",
				className,
				textColorInverse,
				"bg-white",
			].join(" ")}
			{...props}
		>
			{children}
		</Link>
	);
}

function Button({ type, buttonType, className, children, ...props }) {
	const { textColorInverse } = getClassesByType(type);

	return (
		<BasicButton
			className={[className, textColorInverse, "bg-white"].join(" ")}
			type={buttonType}
			{...props}
		>
			{children}
		</BasicButton>
	);
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
