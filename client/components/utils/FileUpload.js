import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { publicRequest } from "../../apiConnection";
import Progressbar from "../Progressbar";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileUpload({ refFun }) {
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");
  const [totalProgress, setTotalProgress] = useState(0);

 
  //console.log('docs',document)

  const onDrop = useCallback((acceptedFile) => {
    //console.log(acceptedFile);
    setFile(acceptedFile[0]);

    const formData = new FormData();
    formData.append("file", acceptedFile[0]);
    formData.append("premiumId", premium.id);
    formData.append("docName", document.docName);
    formData.append("documentId", document.id);
    formData.append("customerId", premium.customerId);

    submitForm(formData);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    acceptedFiles: "image/*,*.pdf,*.doc",
    multiple: false,
    maxSize: "1mb",
    onDrop,
  });
  const config = {
    onUploadProgress: (progressEvent) => {
      progressEvent.preventDefault = true;
      setTotalProgress(
        parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      );
      setTimeout(() => setTotalProgress(0), 10000);
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  //console.log(useDropzone)
  const submitForm = async (formData) => {
    //console.log(publicRequest);
    try {
      const doc = await publicRequest.post("upload/document", formData, config);

      setMessage("file uploaded successfully");
      if (refFun) {
        refFun();
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      if (error.status === 500) {
        setMessage("something went wrong");
      }
    }
  };
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  //console.log(useDropzone)
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragReject ? (
        <p className="text-danger">File not accepted</p>
      ) : (
        <p>Drag and drop documents</p>
      )}
      <p className="text-success"> {message}</p>
      <Progressbar progress={totalProgress} />
    </div>
  );
}
export default FileUpload;
