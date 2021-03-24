import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

import { CartContextProvider } from "./contexts/cartContext";
import { UserContext } from "./contexts/userContext";
//aaaa
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import UseEffect from "./pages/UseEffect";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Crud from "./pages/Crud";
import CrudUser from "./pages/CrudUser";
import Multer from "./pages/Multer";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { API, setAuthToken } from "./config/api";

//init token pada axios setiap kali aplikasi direfresh
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/product/:id" component={Detail} />
              <PrivateRoute exact path="/use-effect" component={UseEffect} />
              <PrivateRoute exact path="/products" component={Product} />
              <PrivateRoute exact path="/carts" component={Cart} />
              <PrivateRoute exact path="/crud" component={Crud} />
              <PrivateRoute exact path="/crud-user" component={CrudUser} />
              <PrivateRoute exact path="/multer" component={Multer} />
            </Switch>
          </div>
        </Router>
      </CartContextProvider>
    </QueryClientProvider>
  );
};

export default App;
