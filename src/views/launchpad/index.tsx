import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { InputAdornment, TextField } from "@mui/material";
import { useTheme } from "../../context/ThemeContext";

const Launchpad = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { theme } = useTheme();

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  return (
    <DashboardLayout title={"Launchpad"}>
      <div className="d-flex justify-content-end w-100">
        <TextField
          sx={{
            input: {
              color: theme === "dark" ? "#D8D8D8" : "#212121",
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme === "dark" ? "#5C5C5C" : "#DADADA",
              borderRadius: "8px",
              width: "358px",
              "& fieldset": {
                borderColor: theme === "dark" ? "#5C5C5C" : "#DADADA",
              },
              "&:hover fieldset": {
                borderColor: "#7103d9",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#7103d9",
              },
            },
          }}
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for token"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src="/agent/search-icon.svg" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Launchpad;
