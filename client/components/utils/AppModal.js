import React,{useState,useEffect} from "react";

import { Modal} from "react-bootstrap";
import {useFormik} from 'formik'

const AppModal = ({
    initialValues,
    validationSchema,
    data,
    updateTitle,
    newTitle,
    isModal,
    isUpdate,
    closeModal,
    createAction,
    updateAction,
    children }) => {
  
    
    

   const handleClose = () => setShow(false)
  
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => {
            isUpdate ? updateAction(values) : createAction(values);
            
            setIsUpdate(false)
        }
})

    useEffect(() => {
        if (data) {
            formik.setFieldValue(data)
        }
    }, [])
  
  return (
    <Modal show={isModal} onHide={closeModal} >
      <Modal.Header closeButton>
        <Modal.Title>{isUpdate ? updateTitle : newTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>{children}</form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="float-start btn btn-danger rounded-pill"
          onClick={closeModal}
        >
          Close
        </button>
        <button className="float-start btn btn-primary rounded-pill">
          {isUpdate ? "Update" : "Create"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppModal;
