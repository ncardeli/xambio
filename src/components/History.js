import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Panel from "./Panel";
import { List, ListRow } from "./List";
import { getHistory } from "../state/selectors/history";
import {
  dateToFormattedString,
  currencyToFormattedString,
} from "../util/localization";
import { getClassesByType } from "./styling";
import { doFetchHistory } from "state/actions/history";
import { getUserData } from "state/selectors/auth";
import { resolveBidStatus } from "./util/bid";

function History() {
  const { id: uid } = useSelector(getUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doFetchHistory({ uid }));
  }, [uid]);

  const history = useSelector(getHistory);
  const browserHistory = useHistory();
  const onClick = (id) => () => browserHistory.push(getHistoryRoute(id));

  return (
    <Panel type="main" title="Historial de operaciones" className="w-full">
      {history.length > 0 && (
        <List>
          {history.map(({ id, dollars, match, status, timestamp, type }) => {
            const {
              icon: statusIcon,
              alt: statusAlt,
              text: statusText,
            } = resolveBidStatus(status, timestamp);
            const operationTypeText = type === "sell" ? "Venta" : "Compra";
            const counterPartText =
              status === "completed" ? ` a ${match.name}` : "";
            const text = `${operationTypeText} de ${currencyToFormattedString(
              "USD",
              dollars
            )}${counterPartText}`;
            const { borderColor } = getClassesByType(type);
            return (
              <ListRow
                key={id}
                linkTo={getHistoryRoute(id)}
                onClick={onClick(id)}
              >
                <div
                  className={`absolute h-full inset-y-0 left-0 border-l-4 ${borderColor}`}
                ></div>
                <h3 className="mb-2">{text}</h3>
                <div className="text-sm">
                  <img
                    className="inline pr-2"
                    src={statusIcon}
                    alt={statusAlt}
                    style={{
                      filter: "invert(.4)",
                    }}
                  ></img>
                  {`${statusText} - ${dateToFormattedString(
                    new Date(timestamp)
                  )}`}
                </div>
              </ListRow>
            );
          })}
        </List>
      )}
      {history.length === 0 && (
        <p className="py-6">
          Nada para ver por aquí. Aún no has realizado operaciones.
        </p>
      )}
    </Panel>
  );
}

const getHistoryRoute = (id) => `/history/${id}`;

export default History;
