import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/auth/InputField";
import AuthForm from "../../components/auth/Authform";

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      dispatch(signIn(data));
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} title="Sign In">
      <InputField label="Email" type="email" name="email" register={register} validation={{ required: "Email is required" }} error={errors.email} />
      <InputField label="Password" type="password" name="password" register={register} validation={{ required: "Password is required" }} error={errors.password} />
      <button type="submit">Sign In</button>
    </AuthForm>
  );
};

export default SignIn;
