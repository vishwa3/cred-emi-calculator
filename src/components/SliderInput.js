import React from "react";

function SliderInput({
  min,
  max,
  value,
  step,
  id,
  name,
  list,
  datalistOptions,
  dispatch,
  dispatchType,
}) {
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        id={id}
        name={name}
        list={list}
        onChange={(e) => {
          dispatch({ type: dispatchType, payload: e.target.value });
        }}
      />
      <datalist id={list}>
        {datalistOptions.map((item) => {
          return (
            <option
              key={item.value}
              value={item.value}
              label={item.label}
            ></option>
          );
        })}
      </datalist>
    </>
  );
}

export default SliderInput;
