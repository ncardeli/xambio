import React from "react";
import { getClassesByType } from "./styling";

function Panel({ title, type, className, children }) {
	const { backgroundColor, textColor } = getClassesByType(type);

	return (
		<div
			className={`max-w-lg mx-auto p-10 ${backgroundColor} ${textColor} rounded-lg shadow-2xl flex flex-col ${className}`}
		>
			<h1 className={`mx-auto mb-6 text-2xl ${textColor} leading-tight`}>
				{title}
			</h1>
			{children}
		</div>
	);
}

export default Panel;
