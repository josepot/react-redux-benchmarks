import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Slice from "./Slice";

const getSlices = state => Array(Object.keys(state).length).fill(0);

export default function App() {
  const slices = useSelector(getSlices);
  return (
    <div className="row">
      {slices.map((slice, idx) => (
        <div className="col-lg-4" key={idx}>
          <Slice idx={idx} />
        </div>
      ))}
    </div>
  );
}
