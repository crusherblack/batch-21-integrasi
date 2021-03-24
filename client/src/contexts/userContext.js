import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        isLogin: true,
        user: {
          email: payload.email,
          name: payload.name,
        },
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        ...state,
        isLogin: false,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
