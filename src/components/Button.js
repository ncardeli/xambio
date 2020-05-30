import React from "react";
import { Link } from "react-router-dom";
import { getClassesByType } from "./styling";

function LinkButton({ className, children, ...props }) {
	return (
		<Link className={`btn ${className} text-white`} {...props}>
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

export { Button, TextButton, LinkButton as ButtonLink };
