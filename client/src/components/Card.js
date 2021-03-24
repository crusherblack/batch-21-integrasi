import { useHistory } from "react-router-dom";

const Card = ({ product, fromProduct, addProductToCart }) => {
  const history = useHistory();

  const { id, title, img } = product;

  return (
    <div
      className="mb-3 card"
      onClick={() => {
        if (!fromProduct) {
          history.push(`/product/${id}`);
        } else {
          return;
        }
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <img
        src={img}
        alt={title}
        style={{
          height: "140px",
          objectFit: "cover",
        }}
      />
      <div className="card-body ">
        <p
          style={{
            height: "40px",
          }}
        >
          {title}
        </p>
        <div className=" d-flex justify-content-center align-items-center flex-column">
          {fromProduct && (
            <button
              onClick={() => addProductToCart(product)}
              className="mb-2 btn btn-primary btn-block"
            >
              Add To Cart
            </button>
          )}
          <small className="font-weight-bold">Rp 500.000</small>
        </div>
      </div>
    </div>
  );
};

export default Card;
