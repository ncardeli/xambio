import React from "react";
import { useSelector } from "react-redux";
import { getExchangeRate } from "state/selectors/exchangeRate";
import { ButtonLink } from "./Button";
import Panel from "./Panel";
import Spinner from "./Spinner";
import { getClassesByType } from "./styling";

function Home() {
  const { exchangeRate, isFetching } = useSelector(getExchangeRate);
  const { textColor } = getClassesByType("main");

  return (
    <Panel type="main" title="¿Buscas vender o comprar dólares?">
      <p className={`${textColor} mx-auto text-2xl`}>
        US$1 = {isFetching ? <Spinner></Spinner> : `$${exchangeRate}`}
      </p>
      <nav className="flex justify-center mt-5">
        <ButtonLink
          type="sell"
          mode="normal"
          className="mx-2 flex-1"
          to="/sell"
        >
          Vender
        </ButtonLink>
        <ButtonLink type="buy" mode="normal" className="mx-2 flex-1" to="/buy">
          Comprar
        </ButtonLink>
      </nav>
    </Panel>
  );
}

export default Home;
