import { FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useFormikContext } from "formik";
import React from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectBoxNewProps {
  name: string;
  label: string;
  options?: SelectOption[];
  value: string; // formik.values[name] olarak alınacak
  setFieldValue: (field: string, value: string) => void; // Formik'in setFieldValue fonksiyonu
  error: any;
}

const CustomSelectBoxNew = ({
  name,
  label,
  options = [],
  value,
  setFieldValue,
  error,
}: CustomSelectBoxNewProps) => {
  const { theme } = useTheme();

  return (
    <div className="input-wrapper">
      <FormControl fullWidth error={Boolean(error)}>
        <Select
          name={name}
          value={value || ""}
          onChange={(e) => setFieldValue(name, e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span
                  style={{
                    color: theme === "dark" ? "#C7C7C7" : "#8E8E8E",
                  }}
                >
                  {label}
                </span>
              );
            }

            return (
              options.find((opt) => opt.value === selected)?.label || selected
            );
          }}
          sx={{
            backgroundColor: "transparent",
            color: theme === "dark" ? "#C7C7C7" : "#8E8E8E",
            border: "1px solid",
            borderColor: theme === "dark" ? "#5C5C5C" : "#DADADA",
            ".MuiSvgIcon-root": {
              color: theme === "dark" ? "#C7C7C7" : "#8E8E8E",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
                color: theme === "dark" ? "#C7C7C7" : "#8E8E8E",
                border: "1px solid",
                borderColor: theme === "dark" ? "#5C5C5C" : "#DADADA",
              },
            },
          }}
        >
          <MenuItem disabled value="">
            {label}
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
      </FormControl>
    </div>
  );
};

export default CustomSelectBoxNew;
