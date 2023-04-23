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
        interestRate: action.payload,
      };
    }
    case "SET_PROCESSING_FEE": {
      return {
        ...state,
        processingFee: action.payload,
      };
    }
    case "SET_DOWNPAYMENT": {
      return {
        ...state,
        downPayment: action.payload,
      };
    }
    case "SET_EMI": {
      return {
        ...state,
        emi: action.payload,
      };
    }
    case "SET_TENURE": {
      return {
        ...state,
        tenure: action.payload,
      };
    }
    default:
      return state;
  }
}
