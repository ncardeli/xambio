import React from "react";
import Panel from "./Panel";
import { Button } from "./Button";
import { currencyToFormattedString } from "../util/localization";
import { useSelector, useDispatch } from "react-redux";
import { doCancelActiveBid } from "../state/actions/activeBid";
import { getActiveBid } from "state/selectors/activeBid";
import { getUserData } from "state/selectors/auth";

function Waiting() {
  const dispatch = useDispatch();

  const { type, dollars, local } = useSelector(getActiveBid);
  const formattedDollars = currencyToFormattedString("USD", dollars);
  const formattedLocal = currencyToFormattedString("UYU", local);
  const { title, subTitle } = getMessages(type);
  const amountToReceive = type === "sell" ? formattedLocal : formattedDollars;
  const amountToSend = type === "sell" ? formattedDollars : formattedLocal;
  const userData = useSelector(getUserData);

  const onCancel = () => {
    dispatch(doCancelActiveBid({ uid: userData.id }));
  };

  return (
    <Panel title={title} type={type}>
      <section className="flex flex-col text-xl">
        <h3 className="mb-2 mx-auto">{subTitle}</h3>
        <Amount text="Recibirás:" amount={amountToReceive}></Amount>
        <Amount text="Entregarás:" amount={amountToSend}></Amount>
        <Button
          type={type}
          buttonType="button"
          className="block mt-8 width-full"
          onClick={onCancel}
        >
          Retirar oferta
        </Button>
      </section>
    </Panel>
  );
}

function Amount({ text, amount }) {
  return (
    <div className="flex">
      <span className="flex-1 text-right pr-2">{text}</span>
      <strong className="flex-1">{amount}</strong>
    </div>
  );
}

const sellMessages = {
  title: "Oferta de venta de dólares activa",
  subTitle: "Estamos esperando por compradores",
};

const buyMessages = {
  title: "Oferta de compra de dólares activa",
  subTitle: "Estamos esperando por vendedores",
};

function getMessages(type) {
  return type === "sell" ? sellMessages : buyMessages;
}

export default Waiting;
