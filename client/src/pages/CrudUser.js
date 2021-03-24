import { useState } from "react";
import TableRowUser from "../components/TableRowUser";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";

const CrudUser = () => {
  const [idForUpdate, setIdForUpdate] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const { email, password, name, phone } = form;

  const { data: UsersData, loading, error, refetch } = useQuery(
    "userCache",
    async () => {
      const response = await API.get("/users");
      return response;
    }
  );

  const addUser = useMutation(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
      name,
      phone,
    });

    await API.post("/user", body, config);
    refetch();
  });

  const deleteTodo = useMutation(async (id) => {
    await API.delete(`/user/${id}`);
    refetch();
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    addUser.mutate();
  };

  const getTodoById = async (id) => {};

  const deleteUserById = async (id) => {
    deleteTodo.mutate(id);
  };

  const updateTodo = async () => {};

  if (error) return <h1>error</h1>;

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
          <h3 className="text-center">Form Add User</h3>
          {addUser.error?.response?.data && (
            <div class="alert alert-danger" role="alert">
              {addUser.error?.response?.data?.message}
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => onChange(e)}
              name="email"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => onChange(e)}
              name="password"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => onChange(e)}
              name="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              value={phone}
              onChange={(e) => onChange(e)}
              name="phone"
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={!email || !password || !name || !phone ? true : false}
            >
              {idForUpdate ? "Update User" : "Submit User"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-3 row">
        <table className="table table-striped table-hovered">
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading Data</td>
              </tr>
            ) : (
              UsersData?.data?.data?.users?.map((user, index) => (
                <TableRowUser
                  user={user}
                  index={index}
                  key={user.id}
                  getTodoById={getTodoById}
                  deleteUserById={deleteUserById}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudUser;
