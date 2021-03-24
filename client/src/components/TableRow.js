const TableRow = ({ todo, index, getTodoById, deleteTodoById }) => {
  const { id, title, isDone } = todo;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{isDone ? "Done" : "Not Done"}</td>
      <td>
        <button
          className="btn btn-success btn-sm mr-2"
          onClick={() => getTodoById(id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteTodoById(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
