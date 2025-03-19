// import { Controller } from "react-hook-form";

// const InputField = ({ control, name, label, type }) => {
//   return (
//     <div className="input-container">
//       <label>{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             <input {...field} type={type} className={error ? "error" : ""} />
//             {error && <span className="error-text">{error.message}</span>}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// export default InputField;
// import React from "react";
// import { TextField } from "@mui/material";
// import { Controller } from "react-hook-form";

// const InputField = ({ label, name, type = "text", value, onChange }) => {
//   return (
//     <TextField
//       label={label}
//       variant="standard"
//       fullWidth
//       margin="normal"
//       name={name}
//       type={type}
//       value={value}
//       onChange={onChange}
//     />
//   );
// };

// export default InputField;
// const InputField = ({ control, name, label, type, error }) => {
//   return (
//     <div>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue=''
//         // Ensures input is always controlled

//         render={({ field }) => (
//           <TextField
//             {...field}
//             label={label}
//             type={type}
//             variant="standard"
//             fullWidth
//             error={!!error}
//             helperText={error} 
//             //  Show error message
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default InputField;
// import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

// const InputField = ({ control, name, label, type, error }) => {
//   return (
//     <div style={{ marginBottom: "20px" }}> {/* Adds bottom margin */}
//       <Controller
//         name={name}
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label={label}
//             type={type}
//             variant="standard"
//             fullWidth
//             error={!!error}
//             helperText={error}
//             sx={{
//               "& .MuiInput-underline:before": {
//                 borderBottomColor: "#ff0080", // Custom underline color before focus
//               },
//               "& .MuiInput-underline:hover:before": {
//                 borderBottomColor: "#a100ff !important", // Underline on hover
//               },
//               "& .MuiInput-underline:after": {
//                 borderBottomColor: "#7209b7", // Underline after focus
//               },
//             }}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default InputField;
const InputField = ({ control, name, label, type, error }) => {
  return (
    <div style={{ marginBottom: '16px' }}> {/* Added margin-bottom */}
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="standard"
            fullWidth
            error={!!error}
            helperText={error}
            InputProps={{
              style: { borderBottom: '1.5px solid #40298E' } // Applying the extracted color
            }}
          />
        )}
      />
    </div>
  );
};

export default InputField;
