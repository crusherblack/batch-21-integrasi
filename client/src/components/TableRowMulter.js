const TableRowMulter = ({ product, index }) => {
  const { id, image, name, categories } = product;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>
        <ul>
          {categories.map((category) => (
            <li>{category.name}</li>
          ))}
        </ul>
      </td>
      <td>
        <img
          src={image}
          alt={name}
          style={{
            width: "200px",
            height: "130px",
            objectFit: "cover",
          }}
        />
      </td>

      <td>
        <button className="mr-2 btn btn-success btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm">Delete</button>
      </td>
    </tr>
  );
};

export default TableRowMulter;
