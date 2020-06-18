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
				<ButtonLink type="sell" mode="normal" className={`mx-2`} to="/sell">
					Vender
				</ButtonLink>
				<ButtonLink type="buy" mode="normal" className={`mx-2`} to="/buy">
					Comprar
				</ButtonLink>
			</nav>
		</Panel>
	);
}

export default Home;
