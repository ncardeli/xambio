import React from "react";
import { ButtonLink } from "./Button";
import Panel from "./Panel";
import { getClassesByType } from "./styling";

function Home({ exchangeRate }) {
	const { textColor } = getClassesByType("main");
	const { backgroundColor: bgColorSell } = getClassesByType("sell");
	const { backgroundColor: bgColorBuy } = getClassesByType("buy");

	return (
		<Panel type="main" title="¿Buscas vender o comprar dólares?">
			<p className={`${textColor} mx-auto text-2xl`}>US$1 = ${exchangeRate}</p>
			<nav className="flex justify-center mt-5">
				<ButtonLink type="main" className={`mx-2 ${bgColorSell}`} to="/sell">
					Vender
				</ButtonLink>
				<ButtonLink type="main" className={`mx-2 ${bgColorBuy}`} to="/buy">
					Comprar
				</ButtonLink>
			</nav>
		</Panel>
	);
}

export default Home;
