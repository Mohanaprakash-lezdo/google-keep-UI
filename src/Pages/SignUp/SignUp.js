import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/auth/InputField";
import AuthForm from "../../components/auth/Authform";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signUp(data));
    navigate("/signin");
  };

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)} title="Sign Up">
      <InputField label="First Name" type="text" name="firstName" register={register} validation={{ required: "First Name is required" }} error={errors.firstName} />
      <InputField label="Last Name" type="text" name="lastName" register={register} validation={{ required: "Last Name is required" }} error={errors.lastName} />
      <InputField label="Email" type="email" name="email" register={register} validation={{ required: "Email is required" }} error={errors.email} />
      <InputField label="Password" type="password" name="password" register={register} validation={{ required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" }}} error={errors.password} />
      <InputField label="Confirm Password" type="password" name="confirmPassword" register={register} validation={{ required: "Confirm Password is required" }} error={errors.confirmPassword} />
      <button type="submit">Sign Up</button>
    </AuthForm>
  );
};

export default SignUp;
