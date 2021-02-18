import React from "react";
import Bid from "./Bid";
import { doStartActiveBid } from "../state/actions/activeBid";
import { useDispatch } from "react-redux";

const PREFIXED_AMOUNTS = [100, 500, 1000, 2000];

function Sell({ exchangeRate }) {
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    dispatch(
      doStartActiveBid({
        type: "sell",
        dollars: value,
      })
    );
  };
  return (
    <Bid
      submitButtonLabel="Vender"
      exchangeRate={exchangeRate}
      type="sell"
      title="¿Cuántos dólares queres vender?"
      prefixedAmounts={PREFIXED_AMOUNTS}
      onSubmit={onSubmit}
      inputLabel="Dólares a vender"
      convertedAmountText="Recibirás"
    ></Bid>
  );
}

export default Sell;
