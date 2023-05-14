import { useCallback, useMemo, useReducer } from "react";
import "./App.css";
import { loanReducer } from "./reducers/loanReducer";
import { numberWithCommas } from "./utils/config";
import SliderInput from "./components/SliderInput";
import NumberInput from "./components/NumberInput";

function App() {
  const [state, dispatch] = useReducer(loanReducer, {
    totalCost: 7500000,
    interestRate: 9.15,
    loanTenureMonths: 120,
    loanTenureYears: 10,
    loanTenureType: "yr",
  });

  const loanAmountDatalist = useMemo(
    () => [
      { value: "500000", label: "5L" },
      { value: "2500000", label: "25L" },
      { value: "5000000", label: "50L" },
      { value: "7500000", label: "75L" },
      { value: "10000000", label: "1Cr" },
      { value: "12500000", label: "1.25Cr" },
      { value: "15000000", label: "1.5Cr" },
      { value: "17500000", label: "1.75Cr" },
      { value: "20000000", label: "2Cr" },
    ],
    []
  );
  const interestRateDatalist = useMemo(
    () => [
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
      { value: "9", label: "9" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
      { value: "13", label: "13" },
      { value: "14", label: "14" },
      { value: "15", label: "15" },
      { value: "12", label: "16" },
    ],
    []
  );

  const loanTenureYearsDatalist = useMemo(
    () => [
      { value: "1", label: "1Yr" },
      { value: "5", label: "5Yr" },
      { value: "10", label: "10Yr" },
      { value: "15", label: "15Yr" },
      { value: "20", label: "20Yr" },
      { value: "25", label: "25Yr" },
      { value: "30", label: "30Yr" },
    ],
    []
  );

  const loanTenureMonthsDatalist = useMemo(
    () => [
      { value: "12", label: "12" },
      { value: "60", label: "60" },
      { value: "120", label: "120" },
      { value: "180", label: "180" },
      { value: "240", label: "240" },
      { value: "300", label: "300" },
      { value: "360", label: "360" },
    ],
    []
  );
  function renderLoanTenureRange() {
    if (state.loanTenureType === "yr") {
      return (
        <>
          <SliderInput
            min={1}
            max={30}
            value={state.loanTenureYears}
            step={1}
            id="tenure-years"
            name="tenure-years"
            list="tenureYears"
            dispatch={dispatch}
            dispatchType="SET_TENURE_YEARS"
            datalistOptions={loanTenureYearsDatalist}
          />
        </>
      );
    }
    return (
      <>
        <SliderInput
          min={12}
          max={360}
          value={state.loanTenureMonths}
          step={1}
          id="tenure-months"
          name="tenure-months"
          list="tenureMonths"
          dispatch={dispatch}
          dispatchType="SET_TENURE_MONTHS"
          datalistOptions={loanTenureMonthsDatalist}
        />
      </>
    );
  }

  const monthlyEMI = useMemo(() => {
    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1] where P= Loan amount, R= interest rate, N=tenure in number of months

    const rateOfInterest = state.interestRate / 100 / 12;
    const emi =
      state.loanTenureType === "mo"
        ? (state.totalCost *
            rateOfInterest *
            (1 + rateOfInterest) ** state.loanTenureMonths) /
          ((1 + rateOfInterest) ** state.loanTenureMonths - 1)
        : (state.totalCost *
            rateOfInterest *
            (1 + rateOfInterest) ** (state.loanTenureYears * 12)) /
          ((1 + rateOfInterest) ** (state.loanTenureYears * 12) - 1);
    return emi.toFixed(0);
  }, [
    state.totalCost,
    state.interestRate,
    state.loanTenureMonths,
    state.loanTenureType,
    state.loanTenureYears,
  ]);
  const totalPayments =
    state.loanTenureType === "mo"
      ? monthlyEMI * state.loanTenureMonths
      : monthlyEMI * state.loanTenureYears * 12;

  const onKeyDown = useCallback((e) => {
    if (e.key === "." || e.key === "-" || e.key === "+") e.preventDefault();
  }, []);

  return (
    <div className="App">
      <div className="main-title">
        <h2>Home Loan EMI Calculator - RBI</h2>
      </div>
      <div className="container">
        <div className="range-container">
          <div className="range-input">
            <div className="title">
              <p>Home Loan Amount</p>
              <div className="range-value">
                <span>₹</span>

                <NumberInput
                  min={500000}
                  max={20000000}
                  step={1000}
                  value={state.totalCost}
                  onKeyDown={onKeyDown}
                  dispatch={dispatch}
                  dispatchType="SET_TOTAL_COST"
                  minAlertMsg="Minimum loan amount is 5lakhs"
                  maxAlertMsg="Maximum loan amount is 2crores"
                />
              </div>
            </div>

            <SliderInput
              min={500000}
              max={20000000}
              value={state.totalCost}
              step={1000}
              id="loan_amount"
              name="loan_amount"
              list="values"
              dispatch={dispatch}
              dispatchType="SET_TOTAL_COST"
              datalistOptions={loanAmountDatalist}
            />
          </div>
          <div className="range-input">
            <div className="title">
              <p>Loan Tenure</p>
              <div className="range-value">
                <span>
                  <div className="radio">
                    <input
                      type="radio"
                      id="yr"
                      checked={state.loanTenureType === "yr"}
                      onChange={() =>
                        dispatch({ type: "SET_LOANTENURE_TYPE", payload: "yr" })
                      }
                    />
                    <label for="yr">Yr</label>
                    <input
                      type="radio"
                      id="mo"
                      checked={state.loanTenureType === "mo"}
                      onChange={() =>
                        dispatch({ type: "SET_LOANTENURE_TYPE", payload: "mo" })
                      }
                    />
                    <label for="mo">Mo</label>
                  </div>
                </span>

                <NumberInput
                  min={state.loanTenureType === "yr" ? 1 : 12}
                  max={state.loanTenureType === "yr" ? 30 : 360}
                  minAlertMsg={
                    state.loanTenureType === "yr"
                      ? "Minimum loan tenure is 1 year"
                      : "Minimum loan tenure is 12 months"
                  }
                  maxAlertMsg={
                    state.loanTenureType === "yr"
                      ? "Maximum loan tenure is 30 years"
                      : "Maximum loan tenure is 360 months"
                  }
                  value={
                    state.loanTenureType === "yr"
                      ? state.loanTenureYears
                      : state.loanTenureMonths
                  }
                  step={1}
                  onKeyDown={onKeyDown}
                  dispatch={dispatch}
                  dispatchType={
                    state.loanTenureType === "yr"
                      ? "SET_TENURE_YEARS"
                      : "SET_TENURE_MONTHS"
                  }
                />
              </div>
            </div>
            {renderLoanTenureRange()}
          </div>
          <div className="range-input">
            <div className="title">
              <p>Interest Rate</p>
              <div className="range-value">
                <span>%</span>

                <NumberInput
                  value={state.interestRate}
                  min={4}
                  max={16}
                  step={0.01}
                  dispatch={dispatch}
                  dispatchType="SET_INTEREST_RATE"
                  minAlertMsg="Minimum interest rate is 4%"
                  maxAlertMsg="Maximum interest rate is 16%"
                />
              </div>
            </div>

            <SliderInput
              min={4}
              max={16}
              value={state.interestRate}
              step={0.01}
              id="interest-rate"
              name="interest-rate"
              list="interestRateValues"
              dispatch={dispatch}
              dispatchType="SET_INTEREST_RATE"
              datalistOptions={interestRateDatalist}
            />
          </div>
        </div>
        <div className="calculations">
          <div className="calculations_title">
            <h3>Detailed Calculations</h3>
          </div>
          <div className="emi-value">
            <div className="emi-value-container">
              <p>
                <span>₹</span> {numberWithCommas(monthlyEMI)}
              </p>
              <span>EMI</span>
            </div>
          </div>

          <div className="emi-value">
            <div className="emi-value-container">
              <p>
                <span>₹</span>{" "}
                {numberWithCommas(totalPayments - state.totalCost)}
              </p>
              <span>Total interest payable over the loan term</span>
            </div>
          </div>

          <div className="emi-value">
            <div className="emi-value-container">
              <p>
                <span>₹</span> {numberWithCommas(totalPayments)}
              </p>
              <span>Total payments made over the loan term</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
