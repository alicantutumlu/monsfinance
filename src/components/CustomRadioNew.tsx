import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

interface RadioOption {
  value: boolean;
  label: string;
  disabled?: boolean;
}

interface CustomRadioNewProps {
  name: string;
  value: boolean;
  options: RadioOption[];
  onChange: any;
}

const CustomRadioNew = ({
  name,
  value,
  options = [],
  onChange,
}: CustomRadioNewProps) => {
  console.log("value", value);
  return (
    <FormControl className="mt-4">
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name={name}
        value={value}
        onChange={onChange}
        className="d-flex flex-row gap-4">
        {options.map((option, index: number) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={
              <Radio
                sx={{
                  color: "#7103D9",
                  "&.Mui-checked": {
                    color: "#7103D9",
                  },
                  "&.Mui-disabled": {
                    color: "#CCCCCC",
                  },
                }}
                disabled={option.disabled}
              />
            }
            label={option.label}
            className="m-0 text-14-400 input-color"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioNew;
