import React, { useCallback } from "react";
import { useSelector } from "react-redux";

const Counter = ({ idx }) => {
  const selector = useCallback(state => state[idx], [idx]);
  const value = useSelector(selector);
  return <div>Value: {value}</div>;
};

export default function Slice({remainingDepth, idx}) {
  if (remainingDepth > 0) {
    return (
      <div>
        {idx}.{remainingDepth}
        <div>
          <Slice idx={idx} remainingDepth={remainingDepth - 1} />
        </div>
      </div>
    );
  }

  return <Counter idx={idx} />;
}
