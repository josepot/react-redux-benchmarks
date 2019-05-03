import React, { Component, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initialize, createStringId } from "./strings";
import { TEXT_INPUT_MOD } from "./constants";

const Counter = ({ idx }) => {
  const selector = useCallback(state => state.counters[idx], [idx]);
  const value = useSelector(selector);
  return <div>Value: {value}</div>;
};

const TextDisplay = ({idx, inputId, children}) => {
  const stringId = createStringId(idx, inputId);
  const textSelector = useCallback(state => state.strings[stringId] || "unknown", [stringId]);
  const text = useSelector(textSelector)
  const dispatch = useDispatch();
  useEffect(() => { dispatch(initialize({ stringId })) }, [dispatch, stringId]);

  return (
    <div>
      Text {stringId}:<br />
      <textarea value={text} />
      {children}
    </div>
  )
}

class Slice extends Component {
  state = {};

  componentDidMount = () => {
    //this.props.fillPairs(this.props.idx);
  };

  render() {
    const { remainingDepth, idx } = this.props;

    if (remainingDepth > 0) {
      let renderedChild = (
        <div>
          {idx}.{remainingDepth}
          <div>
            <Slice idx={idx} remainingDepth={remainingDepth - 1} />
          </div>
        </div>
      );

      if (remainingDepth % TEXT_INPUT_MOD === 0) {
        renderedChild = (
          <TextDisplay
            idx={idx}
            inputId={remainingDepth / TEXT_INPUT_MOD}
          >
            {renderedChild}
          </TextDisplay>
        );
      }

      return renderedChild;
    }

    return <Counter idx={idx} />;
  }
}
Slice.displayName = "Slice";

export default Slice;
//export default connect(mapStateToProps, actions)(Slice);
