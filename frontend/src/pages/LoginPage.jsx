import React from "react";
import LoginForm from "../components/LoginForm";


const LoginPage = ({ setLoggedIn }) => {
  return (
    <div>
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default LoginPage;