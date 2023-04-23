import { useReducer } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
import { loanReducer } from "./reducers/loanReducer";
function App() {
  const [state, dispatch] = useReducer(loanReducer, {
    totalCost: 0,
    interestRate: 7,
    processingFee: 1,
    downPayment: 0,
    emi: 0,
    tenure: 12,
  });
  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30 }}>
        EMI Calculator
      </span>
      <span className="title">Total Cost of Asset</span>
      <input
        type="number"
        value={state.totalCost}
        onChange={(e) =>
          dispatch({ type: "SET_TOTAL_COST", payload: e.target.value })
        }
      />

      <span className="title">Interest Rate (in %)</span>
      <input
        type="number"
        value={state.interestRate}
        onChange={(e) =>
          dispatch({ type: "SET_INTEREST_RATE", payload: e.target.value })
        }
      />

      <span className="title">Processing Fee (in %)</span>
      <input
        type="number"
        value={state.processingFee}
        onChange={(e) =>
          dispatch({ type: "SET_PROCESSING_FEE", payload: e.target.value })
        }
      />

      <span className="title">Down Payment</span>
      <input
        type="range"
        value={state.downPayment}
        onChange={(e) =>
          dispatch({ type: "SET_DOWNPAYMENT", payload: e.target.value })
        }
      />
      <div className="labels">
        <label>0%</label>
        <label>100%</label>
      </div>

      <span className="title">Loan per Month</span>
      <input
        type="range"
        onChange={(e) => dispatch({ type: "SET_EMI", payload: e.target.value })}
        value={state.emi}
      />

      <span className="title">Tenure</span>
      <div className="tenure">
        {tenureData.map((tenure) => {
          return (
            <button
              key={tenure}
              onClick={() => dispatch({ type: "SET_TENURE", payload: tenure })}
              className={`${state.tenure === tenure && `button_selected`}`}
            >
              {tenure}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
