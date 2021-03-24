const TableRowUser = ({ user, index, getTodoById, deleteUserById }) => {
  const { id, email, name, password, phone } = user;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteUserById(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRowUser;
