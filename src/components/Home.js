import React from "react";
import { ButtonLink } from "./Button";
import Panel from "./Panel";
import { getClassesByType } from "./styling";

function Home({ exchangeRate }) {
	const { textColor } = getClassesByType("main");

	return (
		<Panel type="main" title="¿Buscas vender o comprar dólares?">
			<p className={`${textColor} mx-auto text-2xl`}>US$1 = ${exchangeRate}</p>
			<nav className="flex justify-center mt-5">
				<ButtonLink className="mx-2 bg-red-400" to="/sell">
					Vender
				</ButtonLink>
				<ButtonLink className="mx-2 bg-green-700" to="/buy">
					Comprar
				</ButtonLink>
			</nav>
		</Panel>
	);
}

export default Home;
