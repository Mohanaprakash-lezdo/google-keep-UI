import React from "react";

const InputField = ({ label, type, name, register, validation, error }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} {...register(name, validation)} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default InputField;
