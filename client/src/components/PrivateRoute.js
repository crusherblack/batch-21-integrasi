import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);
  const { loading } = state;

  const Loading = () => {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="spinner-border text-primary"></div>
      </div>
    );
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Loading />
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  );
};

export default PrivateRoute;
