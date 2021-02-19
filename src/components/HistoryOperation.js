import React from "react";
import Panel from "./Panel";
import { useSelector } from "react-redux";
import { getHistoryOperation } from "../state/selectors/history";
import {
  currencyToFormattedString,
  dateToFormattedString,
} from "../util/localization";
import { ButtonLink } from "./Button";

function HistoryOperation({ id }) {
  const {
    dollars,
    local,
    match,
    status,
    timestamp,
    type,
  } = useSelector((state) => getHistoryOperation(state, id));

  const formattedDollars = currencyToFormattedString("USD", dollars);
  const formattedLocal = currencyToFormattedString("UYU", local);
  const operationTypeText = type === "sell" ? "Venta" : "Compra";
  const title = `${operationTypeText} de ${formattedDollars}`;
  return (
    <Panel type="main" title={title}>
      <section className="grid-form mx-auto mb-8">
        <div className="text-right">Operación:</div>
        <div>{id}</div>
        <div className="text-right">Fecha:</div>
        <div>{dateToFormattedString(new Date(timestamp))}</div>
        <div className="text-right">Estado:</div>
        <div>{status === "completed" ? "Completeda" : "Cancelada"}</div>
        <div className="text-right mt-4">
          {type === "sell" ? "Vendiste" : "Compraste"}:
        </div>
        <div className="mt-4">{formattedDollars}</div>
        <div className="text-right">
          {type === "sell" ? "Recibiste" : "Entregaste"}:
        </div>
        <div>{formattedLocal}</div>
        <div className="text-right mt-4">
          {type === "sell" ? "Le vendiste a" : "Le compraste a"}:
        </div>
        <div className="mt-4">
          {match.name} ({"<"}
          <a href={`mailto:${match.email}`}>{match.email}</a>
          {">"})
        </div>
        <div className="text-right">Despositaste en la cuenta:</div>
        <div>
          {match.depositAccount} ({match.depositAccountBank})
        </div>
        <div className="text-right">Recibiste en la cuenta:</div>
        <div>
          {match.receivingAccount} ({match.receivingAccountBank})
        </div>
      </section>
      <ButtonLink
        type="main"
        mode="inverse"
        buttonType="button"
        to="/history"
        className="block mt-8 width-full"
      >
        Volver
      </ButtonLink>
    </Panel>
  );
}

export default HistoryOperation;
