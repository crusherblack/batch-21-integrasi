import { useState } from "react";
import TableRowMulter from "../components/TableRowMulter";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

//useQuery = method GET
//useMutation = method POST, PUT, PATCH & DELETE

const Multer = () => {
  const [form, setForm] = useState({
    name: "",
    image: null,
  });

  const { name, image } = form;

  const {
    data: productData,
    error: productError,
    loading: productLoading,
    refetch: productRefetch,
  } = useQuery("productsCache", async () => {
    return API.get("/products");
  });

  const addProduct = useMutation(async () => {
    const body = new FormData();

    body.append("name", name);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await API.post("/product", body, config);
    productRefetch();
    setForm({
      name: "",
      image: null,
    });
  });

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(tempForm);
  };

  return (
    <div>
      <div className="mt-2 mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addProduct.mutate();
          }}
        >
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
            <label>Image</label>
            <input
              onChange={(e) => onChange(e)}
              name="image"
              type="file"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={!name || !image ? true : false}
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
      <div className="mt-3 row">
        <table className="table table-striped table-hovered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productLoading ? (
              <tr>
                <td colSpan="4">Loading Data</td>
              </tr>
            ) : (
              productData?.data?.data?.products?.map((product, index) => (
                <TableRowMulter
                  product={product}
                  index={index}
                  key={product.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Multer;
