import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Input from "../Input";
import Editor from "@monaco-editor/react";
import { ApiRequest } from "../../api";
import CustomRadio from "../CustomRadio";
import CustomToast from "../CustomToast";
export const CreateAgentsModal = ({
  isOpen,
  handleCloseModal,
  nodes,
  edges,
  trigger,
  setTrigger,
  publicKey,
}: any) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      ownerWallet: publicKey ? publicKey : "",
    },

    onSubmit: async (values: any) => {
      const createBody = {
        name: values.name,
        description: values.description,
        image:
          "https://mindmons-landing-images.s3.eu-central-1.amazonaws.com/agent-image.png",
        ownerWallet: values.ownerWallet,
        edges: edges ? edges : [],
        nodes: nodes ? nodes : [],
      };
      console.log("create bodye bak", createBody);
      ApiRequest.createAgent(createBody)
        .then((res) => {
          setTrigger(!trigger);
          handleCloseModal();
          CustomToast("success", "Agent Saved Successfully");
        })
        .catch((err) => {
          CustomToast("success", "agent saved fail");
          console.log(err);
        });
    },
  });
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
      centered>
      <Modal.Header>
        <h1>Save Agent</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <Input
              formik={formik}
              inputValue={formik.values.name}
              value={`name`}
              title={"Name"}
            />
          </div>
          <div className="col-md-6">
            {" "}
            <Input
              formik={formik}
              inputValue={formik.values.description}
              value={`description`}
              title={"Description"}
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
        </div>

        <div className="d-flex justify-content-end">
          {" "}
          <button
            onClick={() => {
              formik.handleSubmit();
            }}
            className="text-button  p-3">
            Save
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAgentsModal;
