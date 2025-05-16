import { styled, TextField } from "@mui/material";

export function formatDate(dateString: any) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export const numberFormatter = (number: any) => {
  const convertedData = String(number);
  return convertedData?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const getAutoCompleteStyles = (theme: any) => ({
  width: "100%",
  maxWidth: "350px",
  "& .MuiAutocomplete-popupIndicator": {
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
  },
  "& .MuiAutocomplete-clearIndicator": {
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
  },
  "& .MuiInputAdornment-positionStart": {
    "& .MuiTypography-root": {
      color: theme === "dark" ? "#E0E0E0" : "#2D2D2D",
    },
  },
});
export const getTextFieldStyles = (theme: string) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
    fontFamily: "DM Sans, sans-serif",
  },
  "& .MuiInputLabel-root": {
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
    fontFamily: "DM Sans, sans-serif",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
    fontFamily: "DM Sans, sans-serif",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: theme === "light" ? "#F6F6F6" : "#010818",
    "& fieldset": {
      borderColor: theme === "light" ? "#EBEBEB" : "#363F54",
    },
    "&:hover fieldset": {
      borderColor: theme === "light" ? "#EBEBEB" : "#363F54",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme === "light" ? "#EBEBEB" : "#363F54",
    },
    "&.Mui-error fieldset": {
      borderColor: theme === "light" ? "#EBEBEB" : "#363F54",
    },
  },
});

export const autoCompleteListBoxProps = (theme: any) => ({
  style: {
    backgroundColor: theme === "light" ? "#F6F6F6" : "#161921",
    color: theme === "light" ? "#5F5F5F" : "#D1D1D1",
  },
});

export const dateBox = (theme: any) => ({
  fieldset: {
    borderColor: theme === "light" ? "#873721" : "#199eb0",
  },
  "&:hover .MuiOutlinedInput-root fieldset": {
    borderColor: theme === "light" ? "#873721" : "#199eb0",
  },
});

export const analysisDefaultData = {
  symbol: "",
  minOpen: -1,
  minHigh: -1,
  minLow: -1,
  minClose: -1,
  minVolume: -1,
  maxOpen: -1,
  maxHigh: -1,
  maxLow: -1,
  maxClose: -1,
  maxVolume: -1,
  startDate: -1,
  endDate: -1,
  limit: 1,
  page: 1,
  order: "",
  orderBy: "",
};

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart} ${timePart}`;
}

export const getDrawerStyles = (theme: any) => ({
  sx: {
    overflowX: "hidden",
    minWidth: "350px",
    width: "100%",
    maxWidth: "450px",
    height: "100%",
    borderRadius: 4,
    padding: "10px",
    border: "none",
    backgroundColor: theme === "light" ? "#fff" : "#161921",
  },
});

export const drawerButtonSX = {
  marginTop: "9px",
  width: "180px",
  height: "50px",
  fontFamily: "DM Sans",
  fontSize: "16px",
  background: "#189EB0",
  color: "#F4F4F4",
  borderRadius: "8px",
  "&:hover": {
    background: "#189EB0",
  },
};

export const ThemedTextField = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    color: "#ab7363",
    fontFamily: "DM Sans, sans-serif",
  },
  "& .MuiInputLabel-root": {
    color: "#b78779",
    fontFamily: "DM Sans, sans-serif",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#b78779",
    fontFamily: "DM Sans, sans-serif",
  },
}));

export function formatComma(value: any) {
  return value.includes(",") ? value.replace(",", ".") : value;
}

export const getTokenId = (name: string) => {
  const afterHash = name.split("#")[1];

  return Number(afterHash);
};

export const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
