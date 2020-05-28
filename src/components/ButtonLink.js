import React from "react";
import { Link } from "react-router-dom";

function ButtonLink({ className, children, ...props }) {
	return (
		<Link
			className={`${className} text-white font-bold py-2 px-4 mx-2 rounded`}
			{...props}
		>
			{children}
		</Link>
	);
}

export default ButtonLink;
