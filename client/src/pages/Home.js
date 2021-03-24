import { useState, useContext } from "react";
import { CartContext } from "../contexts/cartContext";

import Card from "../components/Card";
import { products } from "../components/data";

const Home = () => {
  const [state, dispatch] = useContext(CartContext);

  const [productsList, setProductsList] = useState(products);
  const [form, setForm] = useState({
    name: "",
    imgUrl: null,
  });

  const { name, imgUrl } = form;

  console.log(form);

  const onChange = (e) => {
    const updateForm = { ...form };
    updateForm[e.target.name] =
      e.target.type === "file"
        ? "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        : e.target.value;
    setForm(updateForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProducts = [
      ...productsList,
      {
        id: Math.random() * 10,
        title: name,
        img: imgUrl,
      },
    ];

    setProductsList(newProducts);
    setForm({
      name: "",
      imgUrl: null,
    });
  };

  return (
    <div>
      <div className="mt-2 mb-3">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-center">Form Add Product</h3>
          <div className="form-group">
            <label>Product Name</label>
            <input
              value={name}
              onChange={(e) => onChange(e)}
              name="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <div className="custom-file">
              <input
                type="file"
                onChange={(e) => onChange(e)}
                name="imgUrl"
                className="custom-file-input"
                id="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">
              Submit Product
            </button>
          </div>
          <pre>{JSON.stringify(form, 2, null)}</pre>
        </form>
      </div>
      <div className="mt-3 row">
        {productsList.map((product) => (
          <div className="col-sm-3" key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
