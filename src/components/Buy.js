import React from "react";
import Bid from "./Bid";
import { useDispatch } from "react-redux";
import { doStartActiveBidSuccess } from "../state/actions/activeBid";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Buy({ exchangeRate }) {
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    dispatch(
      doStartActiveBidSuccess({
        type: "buy",
        dollars: value,
        local: value * exchangeRate,
      })
    );
  };

  return (
    <Bid
      submitButtonLabel="Comprar"
      exchangeRate={exchangeRate}
      type="buy"
      title="¿Cuántos dólares queres comprar?"
      prefixedAmounts={PREFIXED_AMOUNTS}
      onSubmit={onSubmit}
      inputLabel="Dólares a comprar"
      convertedAmountText="Tendrás que pagar"
    ></Bid>
  );
}

export default Buy;
