import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import TwitterLite from "./TwitterLite";

export default function Slice ({ idx }) {
  const getSlice = useCallback(state => state[idx], [idx]);
  const slice = useSelector(getSlice)
  return (
    <ul className="list-group">
      {slice.map(tweet => (
        <TwitterLite sliceId={idx} tweet={tweet} />
      ))}
    </ul>
  );
}
