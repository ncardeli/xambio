import React from "react";
import { Link } from "react-router-dom";
import arrowRight from "../assets/arrow-right.svg";

function List({ children }) {
	return <section className="flex flex-col rounded border">{children}</section>;
}

function ListRow({ linkTo, children, onClick }) {
	return (
		<div
			className="flex flex-col border-b-2 p-4 pr-8 relative cursor-pointer"
			onClick={onClick}
		>
			{children}
			<Link to={linkTo}>
				<img
					className="absolute h-full inset-y-0 right-0 w-3 mr-3 object-center"
					style={{
						filter: "invert(.6)",
					}}
					src={arrowRight}
					alt="Chevron señalando hacia la derecha"
				></img>
			</Link>
		</div>
	);
}

export { List, ListRow };
