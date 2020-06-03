import React from "react";
import overflowIcon from "../assets/overflow.svg";

function Header() {
	return (
		<nav class="flex items-center justify-between flex-wrap bg-orange-600 p-4 mb-4">
			<div class="flex items-center flex-shrink-0 text-white mr-6">
				<span class="font-semibold text-4xl tracking-tight">Xambio</span>
			</div>
			<div class="block lg:hidden">
				<button class="flex items-center px-5 py-2 border rounded border-orange-500 hover:text-white hover:border-white">
					<img
						style={{
							filter: "invert(1)",
							height: "24px",
						}}
						src={overflowIcon}
						alt="Imagen con tres puntos indicando que hay más información"
					></img>
				</button>
			</div>
			<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"></div>
		</nav>
	);
}

export default Header;
