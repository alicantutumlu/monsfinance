"use client";
import React from "react";
import { getIn } from "formik";

const CustomInput = ({
  type,
  placeholder,
  label,
  fieldName,
  payment = false,
  formik,
  disabled = false,
}: any) => {
  const touched = getIn(formik?.touched, fieldName);
  const error = getIn(formik?.errors, fieldName);

  return (
    <div className="w-100 position-relative">
      {label && <p className="mb-2 mid-text gray">{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        value={getIn(formik?.values, fieldName)}
        onChange={formik?.handleChange}
        name={fieldName}
        onFocus={() => {
          if (payment) {
            formik.setFieldValue("focusField", fieldName);
            formik?.setFieldTouched(fieldName, true);
          } else {
            formik?.setFieldTouched(fieldName, true);
          }
        }}
        onBlur={() => formik?.setFieldTouched(fieldName, true)}
        disabled={disabled}
        className="px-3 custom-input w-100"
      />
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default CustomInput;
