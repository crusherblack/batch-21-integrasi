import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

import { products } from "../components/data";
import Card from "../components/Card";

const Product = () => {
  const [state, dispatch] = useContext(CartContext);

  const LoginSuccess = () => {
    dispatch({
      type: "LOGIN_SUCCESS",
    });
  };

  const addProductToCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  return (
    <div>
      <h1>ini adalah product</h1>
      <button onClick={LoginSuccess}>JADI LOGIN </button>
      <div className="row">
        {products.map((product) => (
          <div className="col-sm-3">
            <Card
              product={product}
              key={product.id}
              fromProduct={true}
              addProductToCart={addProductToCart}
            />
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default Product;
