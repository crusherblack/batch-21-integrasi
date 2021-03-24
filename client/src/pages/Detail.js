import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../components/data";
import Card from "../components/Card";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    ProductById();
  }, []);

  const ProductById = () => {
    const filterProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(filterProduct);
  };

  console.log(product);

  return (
    <div>
      ini adalah detail: {id}
      {product && <Card product={product} />}
    </div>
  );
};

export default Detail;
