import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = ({ setLoggedIn }) => {
  return (
    <div>
      <RegisterForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default RegisterPage;
