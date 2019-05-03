import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Slice from "./Slice";
import * as c from "./constants";
import { incrementRandomCounter } from "./counters";

let slices;

const mapState = state => {
  if (!slices) {
    slices = Object.keys(state).map(key => Number(key));
    slices.sort();
  }

  return slices;
};

export default function App() {
  const slices = useSelector(mapState);
  const dispatch = useDispatch();
  const onButtonClick = useCallback(() => dispatch(incrementRandomCounter()), [dispatch])
  return (
    <div>
      <button onClick={onButtonClick}>
        Update Random Counter
      </button>
      <div className="row">
        {slices.map((slice, idx) => {
          return (
            <div style={{ display: "inline-block", minWidth: 70 }} key={idx}>
              <Slice idx={slice} remainingDepth={c.TREE_DEPTH} />
            </div>
          );
        })}
          </div>
        </div>
  );
}
