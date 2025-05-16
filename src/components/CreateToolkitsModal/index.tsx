import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Input from "../Input";
import Editor from "@monaco-editor/react";
import { ApiRequest } from "../../api";
import CustomRadio from "../CustomRadio";
import CustomToast from "../CustomToast";
export const CreateToolkitsModal = ({
  isOpen,
  handleCloseModal,
  trigger,
  publicKey,
  setTrigger,
  allCategories,
}: any) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      toolkitFunction: "const yourFunction = () => {\n// Write code here..\n};",
      toolkitName: "",
      toolkitDescription: "",
      toolkitCategoriesId: "",
      toolkitDocumentation:
        "https://mindmons-landing-images.s3.eu-central-1.amazonaws.com/bcktest3.jpg",
      ownerWallet: publicKey ? publicKey : "",
      functionResponseType: "",
      price: "",
      paymentType: "",
      ticker: "SOL",
    },

    onSubmit: async (values: any) => {
      ApiRequest.createToolkit(values)
        .then((res) => {
          setTrigger(!trigger);
          handleCloseModal();
          CustomToast("success", "Toolkit created successfully");
        })
        .catch((err) => {
          CustomToast("error", "Toolkit created fail");
          console.log(err);
        });
    },
  });
  const handleFileChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFileName(uploadedFile.name);
    }
  };
  return (
    <Modal
      className="boxShadow"
      show={isOpen}
      onHide={() => handleCloseModal()}
      size="xl"
      centered
    >
      <Modal.Header>
        <h1>Action Create</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <Input
              formik={formik}
              inputValue={formik.values.toolkitName}
              value={`toolkitName`}
              title={"Toolkit Name"}
            />
          </div>
          <div className="col-md-6">
            {" "}
            <Input
              formik={formik}
              inputValue={formik.values.toolkitDescription}
              value={`toolkitDescription`}
              title={"Toolkit Description"}
            />
          </div>

          <div className="col-md-6">
            <p className="thick16 w300 trText py-2">Image</p>
            <label className=" form-control px-3 py-2 d-flex justify-center items-center">
              <p className="toolkit-main-text">
                {fileName ? fileName : "Upload Image"}
              </p>

              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="d-none"
              />
            </label>
          </div>
          <div className="col-md-6">
            {" "}
            <p className="thick16 w300 trText py-2">Toolkit Category</p>
            <select
              value={formik.values.toolkitCategoriesId}
              onChange={(e) =>
                formik.setFieldValue("toolkitCategoriesId", e.target.value)
              }
              style={{
                padding: "8px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                height: "60px",
                width: "100%",
                color: "white",
                outline: "none",
              }}
            >
              <option value="">All Categories</option>
              {allCategories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <Input
              formik={formik}
              inputValue={formik.values.functionResponseType}
              value={`functionResponseType`}
              title={"Function Response Type"}
            />
          </div>
          <div className="col-md-6 ">
            <p className="thick16 w300 trText py-2">{"Fee Selection"}</p>
            <div className="d-flex gap-3 ">
              <div className="card  p-3 text-button">
                <CustomRadio
                  label={"Free"}
                  fieldName="paymentType"
                  value="free"
                  formik={formik}
                />
              </div>
              <div className="card  p-3 text-button">
                <CustomRadio
                  label={"Paid"}
                  fieldName="paymentType"
                  value="paid"
                  formik={formik}
                />
              </div>
            </div>
            {formik.values.paymentType === "paid" && (
              <div className="col-md-6">
                {" "}
                <Input
                  formik={formik}
                  inputValue={formik.values.price}
                  value={`price`}
                  title={"Toolkit Price (SOL)"}
                  isRightCard={true}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 ">
          <Editor
            height="330px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={formik.values.toolkitFunction}
            onChange={(e) => {
              formik.setFieldValue("toolkitFunction", e);
            }}
          />
        </div>
        <div className="d-flex justify-content-end">
          {" "}
          <button
            onClick={() => {
              formik.handleSubmit();
            }}
            className="text-button  p-3"
          >
            Publish
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateToolkitsModal;
