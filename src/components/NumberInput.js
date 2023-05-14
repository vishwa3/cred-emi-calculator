import React from "react";

function NumberInput({
  value,
  dispatchType,
  min,
  max,
  minAlertMsg,
  maxAlertMsg,
  step,
  dispatch,
  onKeyDown
}) {
  return (
    <>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) =>
          dispatch({
            type: dispatchType,
            payload: e.target.value,
          })
        }
        onBlur={(e) => {
          if (e.target.value < min) {
            dispatch({ type: dispatchType, payload: min });
            alert(minAlertMsg);
          } else if (e.target.value > max) {
            dispatch({ type: dispatchType, payload: max });
            alert(maxAlertMsg);
          }
        }}
        onKeyDown={onKeyDown && onKeyDown}
      />
    </>
  );
}

export default NumberInput;
