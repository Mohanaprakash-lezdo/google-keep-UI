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
// import { Controller } from "react-hook-form";
// import TextField from "@mui/material/TextField";

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
// const InputField = ({ control, name, label, type, error }) => {
//   return (
//     <div style={{ marginBottom: '16px' }}> {/* Added margin-bottom */}
//       <Controller
//         name={name}
//         control={control}
//         defaultValue=''
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label={label}
//             type={type}
//             variant="standard"
//             fullWidth
//             error={!!error}
//             helperText={error}
//             // InputProps={{
//             //   // style: { borderBottom: '2.5px solid rgb(241 9 9 / 63%)' } 
//             //   // // Applying the extracted color
//             //   style:{ borderBottom: '2px solid #666'}/* Darker bottom border */
//             // }}
//             InputProps={{
//               style: { 
//                 borderBottom: '2px solid #555', // Slightly darker than #666 for more contrast
//                 borderTop: '1px solid #ddd',
//                 borderLeft: '1px solid #ddd',
//                 borderRight: '1px solid #ddd',
//                 borderRadius: '0', // Remove rounded corners for table-like appearance
//                 padding: '10px',
              
//                 backgroundColor: '#fff' // Ensure white background
//               }
//             }}
//           />
//         )}
//       />
//     </div>
//   );
// };

// export default InputField;
// ds before
// import React from 'react';
// import { Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';

// const FormInputField = ({ control, name, label, type = 'text', error }) => {
//   return (
//     <Box sx={{ mb: 3 }}>
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
//               '& .MuiInput-root': {
//                 '&:before': {
//                   borderBottom: '1px solid #e0e0e0' // Default light gray border
//                 },
//                 '&:after': {
//   borderBottom: '2px solid',
//   borderImage: 'linear-gradient(90deg, #555, #666, #555, #3a5c8a, #555, #8a3a3a) 1'
// },
//                 // '&:after': {
//                 //   borderBottom: '2px solid #555' // Darker bottom border on focus
//                 // },
//                 '&:hover:not(.Mui-disabled):before': {
//                   borderBottom: '1px solid #bdbdbd' // Slightly darker on hover
//                 }
//               }
//             }}
//           />
//         )}
//       />
//     </Box>
//   );
// };

// export default FormInputField;
import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const FormInputField = ({ control, name, label, type = 'text', error }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            variant="standard"
            fullWidth
            error={!!error}
            helperText={error}
            InputLabelProps={{
              sx: {
                backgroundClip: "text",
                color: "black", 
                // Default color when not focused
                // backgroundImage: "linear-gradient(90deg, #ff6600,rgb(51, 0, 255),rgb(97, 210, 37))", 
                
                "&.MuiInputLabel-shrink": { 
                  backgroundImage: "linear-gradient(90deg, #ff6600,rgb(255, 145, 0),rgb(97, 210, 37))", 
                  // Color when label moves up
                  color: "transparent", 
                  // Ensures gradient is visible
                },
              },
            }}
            
            sx={{
              
              '& .MuiInput-root': {
                '&:before': {
                  borderBottom: '3.5px solid',
                  borderImage: 'linear-gradient(90deg, #555, #666, #555, #3a5c8a, #555, #8a3a3a) 1'
                },
                '&:after': {
                  borderBottom: '3.5px solid',
                  borderImage: 'linear-gradient(90deg, #555, #666, #555, #3a5c8a, #555, #8a3a3a) 1'
                },
                '&:hover:not(.Mui-disabled):before': {
                  borderBottom: '2px solid',
                  borderImage: 'linear-gradient(90deg, #555, #666, #555, #3a5c8a, #555, #8a3a3a) 1'
                }
              }
            }}
          />
        )}
      />
    </Box>
  );
};

export default FormInputField;