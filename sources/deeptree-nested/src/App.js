import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import Slice from "./Slice";
import * as c from "./constants";
import { incrementMany, incrementRandomCounter } from "./counters";
import { appendRandomCharacter, appendRandomCharToMany } from "./strings";

let slices;

const mapState = state => {
  if (!slices) {
    slices = Array.from({ length: c.NUMBER_OF_SLICES }).map(
      (dummy, idx) => idx
    );
    //slices.sort();
  }

  return slices;
};

function doUpdateMany(mod) {
  return incrementMany({ mod });
}

const mapDispatch = {
  incrementRandomCounter,
  incrementFifth: () => doUpdateMany(5),
  incrementThird: () => doUpdateMany(3),
  appendRandomCharacter,
  appendMany: () => appendRandomCharToMany(4)
};

export default function App() {
  const dispatch = useDispatch();
  const slices = useSelector(mapState);
  const actions = useMemo(() => bindActionCreators(mapDispatch, dispatch), [dispatch]);

  return (
    <div>
      <div>
        <button
          id="incrementRandom"
          onClick={actions.incrementRandomCounter}
        >
          Update Random Counter
        </button>
        <button id="incrementFifth" onClick={actions.incrementFifth}>
          Update 1/5 Counters
        </button>
        <button id="incrementThird" onClick={actions.incrementThird}>
          Update 1/3 Counters
        </button>
        <button
          id="appendRandomCharacter"
          onClick={actions.appendRandomCharacter}
        >
          Append Random Char
        </button>
        <button id="appendMany" onClick={actions.appendMany}>
          Append Char to Many
        </button>
      </div>
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
