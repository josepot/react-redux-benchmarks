import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import Pair from "./Pair";

export default function Slice ({ idx }) {
  const getSlice = useCallback(state => state[idx], [idx]);
  const slice = useSelector(getSlice)
  return (
    <ul className="list-group">
      {slice.map(pair => (
        <Pair key={pair.id} sliceId={idx} pairId={pair.id} />
      ))}
    </ul>
  );
}
