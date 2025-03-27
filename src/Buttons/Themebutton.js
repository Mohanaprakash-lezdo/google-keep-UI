import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    MuiButton: {
      // styleOverrides: {
      //   root: {
      //     borderRadius: "12px",
      //     padding: "10px 20px",
      //     fontSize: "1rem",
      //     fontWeight: "bold",
      //     transition: "all 0.3s ease-in-out",
      //     "&:hover": {
      //       transform: "scale(1.05)",
      //     },
      //   },
      // },
      variants: [
        {
          props: { variant: "raise" },
          style: {
            backgroundColor: "black",
            color: "#ffa260",
            width: "89px",
            height: "8px",
            border: "2px solid #ffa260",
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            borderRadius: "3px",
            fontWeight: "bold",
            padding:'32px',

            "&:hover, &:focus": {
              transform: "translateY(-0.25em)",
              borderColor: "#d9e00be2",
              boxShadow: "0px 4px 10px rgb(235, 235, 14,0.5)",
              color: "white",
              backgroundColor:'black'
            },
          },
        },
      ],
    },
  },
});

export default theme;
