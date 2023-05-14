export function loanReducer(state, action) {
  switch (action.type) {
    case "SET_TOTAL_COST": {
      return {
        ...state,
        totalCost: action.payload,
      };
    }
    case "SET_INTEREST_RATE": {
      return {
        ...state,
        interestRate: parseFloat(parseFloat(action.payload).toFixed(2)),
      };
    }
    case "SET_LOANTENURE_TYPE": {
      return {
        ...state,
        loanTenureType: action.payload,
      };
    }
    case "SET_TENURE_MONTHS": {
      return {
        ...state,
        loanTenureMonths: action.payload,
      };
    }
    case "SET_TENURE_YEARS": {
      return {
        ...state,
        loanTenureYears: action.payload,
      };
    }
    default:
      return state;
  }
}
