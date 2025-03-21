// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import {signUp} from '../../features/authSlice'
// import InputField from "../../components/Auth/inputField";
// import { useNavigate } from "react-router-dom";
// // import "../styles.css";

// const SignUp = () => {
//   const { control, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     dispatch(signUp(data));
//       navigate("/signin");
   
    
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <InputField control={control} name="firstName" label="First Name" type="text" />
//         <InputField control={control} name="lastName" label="Last Name" type="text" />
//         <InputField control={control} name="email" label="Email" type="email" />
//         <InputField control={control} name="password" label="Password" type="password" />
//         <InputField control={control} name="confirmPassword" label="Confirm Password" type="password" />
//         <button type="submit" className="btn-continue">Sign Up</button>
//       </form>
//       <p>Already have an account? <a href="/signin">Sign In</a></p>
//     </div>
//   );
// };

// export default SignUp;


import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../features/authSlice";
import InputField from "../../components/Auth/InputField";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../Buttons/Custombutton";
import * as yup from "yup";

//  Define Yup Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), 
    // Use Yup for validation
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signUp(data));
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField control={control} name="firstName" label="First Name" type="text" error={errors.firstName?.message} />
        <InputField control={control} name="lastName" label="Last Name" type="text" error={errors.lastName?.message} />
        <InputField control={control} name="email" label="Email" type="email" error={errors.email?.message} />
        <InputField control={control} name="password" label="Password" type="password" error={errors.password?.message} />
        <InputField control={control} name="confirmPassword" label="Confirm Password" type="password" error={errors.confirmPassword?.message} />
        <CustomButton variant="continue" type="submit">
          Register
        </CustomButton>
      </form>
      <p>Already have an account? <a href="/signin">Sign In</a></p>
    </div>
  );
};

export default SignUp;
