const ADD_TO_CART = "carts/ADD_TO_CART";
const REMOVE_FROM_CART = "carts/REMOVE_FROM_CART";
const CLEAR_CART = "carts/CLEAR_CART";

export const addToCart = sandwich => ({
  type: ADD_TO_CART,
  sandwich
});

export const removeFromCart = sandwichId => ({
  type: REMOVE_FROM_CART,
  sandwichId
});

export const clearCart = () => ({
  type: CLEAR_CART
})

const cartReducer = (state = {sandwiches: []}, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      return {...state, sandwiches: [...state.sandwiches, action.sandwich]}
    case REMOVE_FROM_CART:
      return {...state, sandwiches: state.sandwiches.filter(sandwich => sandwich._id !== action.sandwichId)}
    case CLEAR_CART:
      return {sandwiches: []}
    default:
      return state;
  }
}

export default cartReducer;