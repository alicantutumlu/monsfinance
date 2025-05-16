import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import UploadBox from "../../components/UploadBox";
import CustomRadioNew from "../../components/CustomRadioNew";
import CustomSelectBoxNew from "../../components/CustomSelectBoxNew";
import { useFormik } from "formik";
import { ApiRequest } from "../../api";
import MonsToast from "../../Toast/MonsToast";
import { useTheme } from "../../context/ThemeContext";
import * as Yup from "yup";
import { useWallet } from "@solana/wallet-adapter-react";

const CreateAgent = () => {
  const { theme } = useTheme();
  const { publicKey } = useWallet();
  const convertedPubKey = publicKey?.toString();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string()
      .required("Description is required")
      .max(250, "Must be 250 characters or fewer"),
    // pricing: Yup.boolean().required("pricing is required"),
    price: Yup.number().when("pricing", {
      is: true,
      then: (schema) =>
        schema
          .required("Price is required")
          .min(1, "Price must be a number greater than 0"),
      otherwise: (schema) => schema.nullable(),
    }),
    prompt: Yup.string()
      .required("Prompt is required")
      .max(250, "Must be 250 characters or fewer"),
    modelBase: Yup.string().required("Model Base is required"),
    // parameters: Yup.object({
    //   temperature: Yup.number().required("Temperature is required"),
    //   maxTokens: Yup.number().required("Max Tokens is required"),
    // }),

    file: Yup.string().required("Image is required"),
    // createdBy: Yup.string().required("Created By is required"),
  });

  console.log("convert", convertedPubKey);
  const formikCreateAgent = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      pricing: false,
      price: "",
      prompt: "",
      modelBase: "",
      parameters: {
        temperature: null,
        maxTokens: null,
      },
      file: "",
      createdBy: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const reqBody = {
        name: values.name,
        description: values.description,
        isPaid: values.pricing ? "Paid" : "Free",
        price: values.price,
        prompt: values.prompt,
        modelBase: values.modelBase,
        parameters: {
          temperature: 0,
          maxTokens: 0,
        },
        image: values.file,
        createdBy: convertedPubKey,
      };

      try {
        await ApiRequest.createAgency(reqBody);
        MonsToast("success", "Agent has been created successfully.", theme);
        resetForm();
      } catch (err) {
        MonsToast(
          "error",
          "An error occurred while creating the agent. Please try again.",
          theme
        );
        console.error(err);
      }
    },
  });

  console.log("errors", formikCreateAgent.errors);

  return (
    <DashboardLayout title={"Create Agent"}>
      <div className="row">
        <div className="col-lg-4 ">
          <div className="d-flex gap-2 align-items-center">
            <div className="title-border" />
            <p className="text-20-600 purple">Image</p>
          </div>
          <UploadBox formik={formikCreateAgent} />
          <div className="d-flex gap-2 align-items-center mt-5">
            <div className="title-border" />
            <p className="text-20-600 purple">Pricing</p>
          </div>
          <CustomRadioNew
            name="pricing"
            value={formikCreateAgent.values.pricing}
            options={[
              { value: false, label: "Free" },
              { value: true, label: "Paid" },
            ]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              formikCreateAgent.setFieldValue(
                "pricing",
                e.target.value === "true"
              )
            }
          />
          {formikCreateAgent.values.pricing == true && (
            <div className="input-wrapper my-2">
              <input
                type="number"
                name="price"
                value={formikCreateAgent.values.price}
                onChange={formikCreateAgent.handleChange}
                onBlur={formikCreateAgent.handleBlur}
                className="input-text w-100 text-14-400 input-color"
                placeholder="Enter price"
              />
              {formikCreateAgent.touched.price &&
                formikCreateAgent.errors.price && (
                  <div className="text-danger mt-1 text-12">
                    {formikCreateAgent.errors.price}
                  </div>
                )}
            </div>
          )}
        </div>

        <div className="col-lg-8">
          <div className="create-agent-bg d-flex gap-5 flex-column">
            <div className="d-flex flex-wrap flex-sm-nowrap gap-3 align-items-center w-100">
              <div className="title-border flex-shrink-0" />
              <p className="text-20-600 purple m-0 label-title">Agent Name</p>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={formikCreateAgent.values.name}
                  onChange={formikCreateAgent.handleChange}
                  onBlur={formikCreateAgent.handleBlur}
                  className="input-text w-100 text-14-400 input-color"
                  placeholder="Enter Agent Name"
                />
                {formikCreateAgent.touched.name &&
                  formikCreateAgent.errors.name && (
                    <div className="text-danger mt-1 text-12">
                      {formikCreateAgent.errors.name}
                    </div>
                  )}
              </div>
            </div>

            <div>
              <div className="d-flex flex-wrap flex-sm-nowrap gap-3 align-items-center w-100">
                <div className="title-border flex-shrink-0" />
                <p className="text-20-600 purple m-0 label-title">
                  Description
                </p>
                <div className="input-wrapper">
                  <textarea
                    name="description"
                    maxLength={250}
                    className="input-text textarea w-100 text-14-400 input-color"
                    placeholder="Enter Description of Agent"
                    value={formikCreateAgent.values.description}
                    onChange={formikCreateAgent.handleChange}
                    onBlur={formikCreateAgent.handleBlur}
                  />
                  {formikCreateAgent.touched.description &&
                    formikCreateAgent.errors.description && (
                      <div className="text-danger text-12 mt-1">
                        {formikCreateAgent.errors.description}
                      </div>
                    )}
                </div>
              </div>

              <div className="text-end mt-1">
                <span className="text-12 input-color">
                  Must be {250 - formikCreateAgent.values.description.length}{" "}
                  characters or fewer
                </span>
              </div>
            </div>

            <div className="d-flex flex-wrap flex-sm-nowrap gap-3 align-items-center w-100">
              <div className="title-border flex-shrink-0" />
              <p className="text-20-600 purple m-0 label-title">
                Model Base <br /> and Parameters
              </p>
              <CustomSelectBoxNew
                name="modelBase"
                label="Select Model Base"
                options={[
                  { value: "gpt-4", label: "GPT-4" },
                  { value: "llama", label: "Llama 3" },
                  { value: "claude", label: "Claude 3" },
                ]}
                value={formikCreateAgent.values.modelBase}
                setFieldValue={formikCreateAgent.setFieldValue}
                error={
                  formikCreateAgent.touched.modelBase &&
                  formikCreateAgent.errors.modelBase
                }
              />
            </div>
            <div>
              <div className="d-flex flex-wrap flex-sm-nowrap gap-3 align-items-center w-100">
                <div className="title-border flex-shrink-0" />
                <p className="text-20-600 purple m-0 label-title">Prompt</p>
                <div className="input-wrapper">
                  <textarea
                    name="prompt"
                    maxLength={250}
                    className="input-text textarea w-100 text-14-400 input-color"
                    placeholder="Enter Prompt"
                    value={formikCreateAgent.values.prompt}
                    onChange={formikCreateAgent.handleChange}
                    onBlur={formikCreateAgent.handleBlur}
                  />
                  {formikCreateAgent.touched.prompt &&
                    formikCreateAgent.errors.prompt && (
                      <div className="text-danger text-12 mt-1">
                        {formikCreateAgent.errors.prompt}
                      </div>
                    )}
                </div>
              </div>

              <div className="text-end mt-1">
                <span className="text-12 input-color">
                  Must be {250 - formikCreateAgent.values.prompt.length}{" "}
                  characters or fewer
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4 ">
            <button
              onClick={() => formikCreateAgent.handleSubmit()}
              className="button-purple"
            >
              Create My Agent
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateAgent;
