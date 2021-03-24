import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);

  const deleteProductFromCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: {
        id,
      },
    });
  };

  return (
    <div>
      <h1>Jumlah Product: {state.carts.length}</h1>
      {state.carts.map((cart) => (
        <>
          <h1>{cart.title}</h1>
          <h1>{cart.qty}</h1>
          <button onClick={() => deleteProductFromCart(cart.id)}>Remove</button>
        </>
      ))}
    </div>
  );
};

export default Cart;
