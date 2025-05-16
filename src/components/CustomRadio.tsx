"use client";
import { getIn } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";

const CustomRadio = ({ label, formik, fieldName, value, onChange }: any) => {
  const handleCheckboxChange = () => {
    formik.setFieldValue(fieldName, value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="customCheckBox flex-wrap">
      <Form.Check
        checked={getIn(formik.values, fieldName) === value}
        onChange={handleCheckboxChange}
        name={fieldName}
        type="checkbox"
        className="custom-checkbox mb-0"
        label={
          <span
            className="pointer no-wrap check-label"
            onClick={handleCheckboxChange}>
            {label}
          </span>
        }
      />
    </div>
  );
};

export default CustomRadio;
