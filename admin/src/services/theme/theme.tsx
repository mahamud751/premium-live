import { createTheme } from "@mui/material/styles";

const componentOverrides = {
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#d1d5db",
          },
          "&:hover fieldset": {
            borderColor: "black",
          },
          "&.Mui-focused fieldset": {
            borderColor: "black",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#6b7280",
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "#6b7280",
        "&.Mui-focused": {
          color: "#6b7280",
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        color: "#000000",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#d1d5db",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#000000",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#000000",
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        color: "#000000",
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "rgb(234, 239, 244)",
      paper: "#ffffff",
    },
    text: {
      primary: "#1C252E",
      secondary: "#6b7280",
    },
  },
  components: componentOverrides,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "linear-gradient(to right, #141a21, #232526)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1a1",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(to right, #141a21, #232526)",
          color: "#ffffff",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#141a21",
          color: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#141a21",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#141a21",
          },
        },
      },
    },
  },
});
