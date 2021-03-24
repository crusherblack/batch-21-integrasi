import { useState, useEffect } from "react";
import TableRow from "../components/TableRow";
import { API } from "../config/api";

const Crud = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    isDone: "notDone",
  });

  const { title, isDone } = form;

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await API.get("/todos");

      setTodos(response.data.data.todos);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        title,
        isDone: isDone === "done" ? true : false,
      });

      const response = await API.post("/todo", body, config);
      const todo = response.data.data.todo;

      setTodos([todo, ...todos]);

      setForm({
        title: "",
        isDone: "notDone",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoById = async (id) => {
    try {
      const response = await API.get(`/todo/${id}`);
      const todo = response.data.data.todo;
      setIdForUpdate(todo.id);
      setForm({
        title: todo.title,
        isDone: todo.isDone ? "done" : "notDone",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoById = async (id) => {
    try {
      await API.delete(`/todo/${id}`);
      const updatedTodo = todos.filter((todo) => todo.id !== id);

      setTodos(updatedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        title,
        isDone: isDone === "done" ? true : false,
      });

      const response = await API.patch(`/todo/${idForUpdate}`, body, config);
      const responseTodo = response.data.data.todo;

      const updatedTodos = todos.map((todo) =>
        todo.id == responseTodo.id ? responseTodo : todo
      );

      setTodos(updatedTodos);

      setForm({
        title: "",
        isDone: "notDone",
      });
      setIdForUpdate(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-2 mb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (idForUpdate) {
              updateTodo();
            } else {
              handleSubmit();
            }
          }}
        >
          <h3 className="text-center">Form Add Todo</h3>
          <div className="form-group">
            <label>Product Name</label>
            <input
              value={title}
              onChange={(e) => onChange(e)}
              name="title"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <select
              className="form-control"
              name="isDone"
              value={isDone}
              onChange={(e) => onChange(e)}
            >
              <option value="done">Done</option>
              <option value="notDone">Not Done</option>
            </select>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={!title ? true : false}
            >
              {idForUpdate ? "Update Todo" : "Submit Todo"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-3 row">
        <table className="table table-striped table-hovered">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading Data</td>
              </tr>
            ) : (
              todos.map((todo, index) => (
                <TableRow
                  todo={todo}
                  index={index}
                  key={todo.id}
                  getTodoById={getTodoById}
                  deleteTodoById={deleteTodoById}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crud;
