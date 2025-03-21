// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import {signIn} from '../../features/authSlice'
// import InputField from "../../components/Auth/inputField";
// import { useNavigate } from "react-router-dom";
// // import "../styles.css";

// const SignIn = () => {
//   const { control, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     dispatch(signIn(data));
//     navigate("/");
//   };
//   console.log("SignIn Component is rendering...");

//   const handleNavigate = () => {
//     console.log("Navigating to Sign Up...");
//     navigate("/signup");
//   };

//   return (
//     <div className="auth-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <InputField control={control} name="email" label="Email" type="email" />
//         <InputField control={control} name="password" label="Password" type="password" />
//         <button type="submit" className="btn-continue">Sign In</button>
//       </form>
//       <p>Don't have an account? <span onClick={handleNavigate} style={{cursor: "pointer", color: "blue"}}>Sign Up</span></p>

//     </div>
//   );
// };

// export default SignIn;
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/authSlice";
import InputField from "../../components/Auth/InputField";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../Buttons/Custombutton";
import Button from '@mui/material/Button';
//  Define Yup Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), 
    //  Use Yup for validation
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signIn(data));
    navigate("/");
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField control={control} name="email" label="Email" type="email" error={errors.email?.message} />
        <InputField control={control} name="password" label="Password" type="password" error={errors.password?.message} />
        <CustomButton variant="facebook" type="submit">
          continue
        </CustomButton>
        <Button variant="facebook">Text</Button>
      </form>
      <p>Don't have an account? <span onClick={handleNavigate} style={{ cursor: "pointer", color: "blue" }}>Sign Up</span></p>
    </div>
  );
};

export default SignIn;
