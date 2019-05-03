import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Slice from "./Slice";
import { updateRandomPairInSlice } from "./pairActions";

let slices;

const mapState = state => {
  if (!slices) {
    slices = Array(Object.keys(state).length).fill(0);
  }

  return slices;
};

export default function App() {
  const dispatch = useDispatch();
  const onButtonClick = useCallback(() => dispatch(updateRandomPairInSlice()), [dispatch]);
  const slices = useSelector(mapState);

  return (
    <div>
      <button onClick={onButtonClick}>
        Update Random Pair
      </button>
      <div className="row">
        {slices.map((slice, idx) => (
          <div className="col-lg-4" key={idx}>
            <Slice idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
