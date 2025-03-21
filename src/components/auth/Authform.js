import React from "react";

const AuthForm = ({ children, onSubmit, title }) => {
  return (
    <div className="auth-container">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default AuthForm;
