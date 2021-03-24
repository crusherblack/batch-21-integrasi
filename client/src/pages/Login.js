import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";

const Login = () => {
  const router = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [form, setForm] = useState({
    email: "fadhildarm13@gmail.com",
    password: "12345678",
  });

  const { email, password } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const LoginUser = () => {
    dispatch({
      type: "LOGIN_SUCCESS",
    });
    handleClose();
    router.push("/");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClose2 = () => {
    setShow(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        email,
        password,
      });

      const response = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      setAuthToken(response.data.data.user.token);
      router.push("/");

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h1 className={`${state.isLogin ? "text-success" : "text-danger"}`}>
        {state.isLogin ? "ANDA LOGIN" : "TIDAK LOGIN"}
      </h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Please Login to Access This Application</h1>
        <div className="form-group">
          <label>Input Your Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            placeholder="email"
          />
        </div>
        <div className="form-group">
          <label>Input Your Password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            LOGIN
          </button>
        </div>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <h1
            onClick={() => {
              handleClose();
              setShow2(true);
            }}
          >
            go to register
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={LoginUser}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
          <h1
            onClick={() => {
              handleClose2();
              setShow(true);
            }}
          >
            go to login
          </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={LoginUser}>
            REGISTER
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
