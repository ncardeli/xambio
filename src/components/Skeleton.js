import React from "react";
import ReactLoadingSkeleton from "react-loading-skeleton";
import Panel from "./Panel";

function Skeleton({ count = 3, type = "main" }) {
  return (
    <Panel
      type={type}
      title={<ReactLoadingSkeleton height={40}></ReactLoadingSkeleton>}
    >
      <ReactLoadingSkeleton count={count}></ReactLoadingSkeleton>
    </Panel>
  );
}

export default Skeleton;
