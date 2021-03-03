import check from "../../assets/check.svg";
import cross from "../../assets/close.svg";
import { isBidTimestampActive } from "state/selectors/activeBid";

const checkIcon = {
  icon: check,
  alt: "Check",
};

const crossIcon = {
  icon: cross,
  alt: "Cruz",
};

const bidStatusMap = {
  completed: {
    ...checkIcon,
    text: "Completada",
  },
  aborted: {
    ...crossIcon,
    text: "Cancelada",
  },
  active: {
    ...checkIcon,
    text: "Activa",
  },
  unknown: {
    ...crossIcon,
    text: "Desconocido",
  },
  expired: {
    ...crossIcon,
    text: "Expirada",
  },
};

function resolveBidStatus(status, timestamp) {
  if (bidStatusMap[status]) {
    return bidStatusMap[status];
  }

  if (!status) {
    return isBidTimestampActive(timestamp)
      ? bidStatusMap.active
      : bidStatusMap.expired;
  }

  return bidStatusMap.unknown;
}

export { resolveBidStatus };
