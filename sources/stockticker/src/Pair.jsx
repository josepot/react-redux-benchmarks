import React, { useCallback, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export default function Pair({ sliceId, pairId }) {
  const selector = useCallback(state => state[sliceId][pairId], [sliceId, pairId]); 
  const { value, name } = useSelector(selector);

  const latestValue = useRef(value);
  const latestDirection = useRef('up');

  let direction = value === latestValue.current
    ? latestDirection.current
    : value > latestValue.current ? 'up' : 'down';

  useEffect(() => {
    latestDirection.current = direction;
    latestValue.current = value;
  })

  return useMemo(
    () => (
      <li className="list-group-item">
        <span>{name}</span>
        <span
          className={
            "pull-right " +
            (direction === "up" ? "text-success" : "text-warning")
          }
        >
          <span
            className={
              "glyphicon " +
              (direction === "up"
                ? "glyphicon-arrow-up"
                : "glyphicon-arrow-down")
            }
          />
          <span>{value}</span>
        </span>
      </li>
    ),
    [value]
  )
}
