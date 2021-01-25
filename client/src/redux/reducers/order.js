const initialState = {
  order: [],
  one: {},
  status: "idle",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ORDER_STATUS_LOADING":
      return {
        ...state,
        status: "loading",
      };

    case "ORDER_STATUS_FAILED":
      return {
        ...state,
        status: "failed",
      };

    case "SHOW_USERS_ORDER":
      return {
        ...state,
        order: action.payload,
        status: "idle",
      };

    case "SHOW_ONE_ORDER":
      return {
        ...state,
        order: action.payload,
        status: "idle",
      };

    case "SHOW_CART_ORDER":
      return {
        ...state,
        one: action.payload,
        status: "idle",
      };

    case "SHOW_ORDER":
      return {
        ...state,
        one: action.payload,
        status: "idle",
      };

    case "SHOW_ALL_ORDERS":
      return {
        ...state,
        order: action.payload,
        status: "idle",
      };

    case "SHIPPING_ADDRESS_ORDER":
      return {
        ...state,
        one: action.payload,
        status: "idle",
      };

    case "ORDER_SUCCESS":
      return {
        ...state,
        one: action.payload,
        status: "idle",
      };

    case "ORDER_STATUS_COMPLETED":
      return {
        ...state,
        one: {
          ...state.one,
          state: "completed",
        },
        order: state.order.map((orderId) => {
          if (orderId.id === state.one.id) {
            orderId.state = "completed";
            return orderId;
          } else {
            return orderId;
          }
        }),
      };

    case "ORDER_STATUS_CANCELLED":
      return {
        ...state,
        one: {
          ...state.one,
          state: "cancelled",
        },
        order: state.order.map((orderId) => {
          if (orderId.id === state.one.id) {
            orderId.state = "cancelled";
            return orderId;
          } else {
            return orderId;
          }
        }),
      };

    default:
      return state;
  }
};

export default orderReducer;
