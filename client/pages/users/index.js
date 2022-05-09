import { useState, useEffect } from "react";
import DataTable from "./../../components/utils/AppTable";
import { useRouter } from "next/router";
import { URL, BASE_URL } from "./../../apiConnection";
import Modal from "../../components/utils/AppModal";
import TextField from "../../components/utils/TextField";
import SelectInput from "../../components/utils/SelectInput";
import * as yup from "yup";
import {useFormik} from 'formik'

const validationSchema = yup.object({});

import dynamic from "next/dynamic";
const index = ({ usersData }) => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useRouter();

  const handleShow = () => {
    setIsModal(true);
  };
    const closeModal = () => {
       setIsUpdate(false);
    setIsModal(false);
  };

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const initialValues = {
    name: "",
  };
  const getUsers = () => {
    URL.get("/users")
      .then((res) => {
        setUsers(res.data.data.user);
      })
      .then((error) => console.log(error));
  };
  // const handleModal = () => setIsShow(true);
    const createAction = () => { };
    
    const editAction = () => {
        setData({
          name:"Gift"
      })
    setIsUpdate(true);
    handleShow();
    };
    
  const deleteAction = (id) => {
    URL.delete(`users/${id}`).then((res) => {
      getUsers();
    });
    };
    
  const columns = [
    {
      name: "name",
      cell: (row) => row.name,
      sort: true,
    },
    {
      name: "email",
      cell: (row) => row.email,
    },
    ];
    
  return (
    <div className="card-body">
      <DataTable
        title="User List"
        action
        data={users}
        search
        create
        createAction={handleShow}
        editAction={editAction}
        deleteAction={deleteAction}
        columns={columns}
        pagination
      />
      <Modal
        validationSchema={validationSchema}
        initialValues={initialValues}
        data={data}
        isModal={isModal}
        closeModal={closeModal}
        updateTitle="Update User"
        newTitle="New User"
        createAction={createAction}
        isUpdate={isUpdate}
      >
        <TextField label="Full Name" type="text" name="name" />
        <TextField label="Email" type="text" name="email" />
        <TextField label="Password" type="password" name="Password" />
        <TextField label="Confirm Password" type="text" name="confirmPassword" />
              <SelectInput
                  name="role"
                  data={[{
                      label: "ADMIN",
                      value:"ADMIN"
                  }]}
              />
          </Modal>
    </div>
  );
};

export const getStaticProps = async (context) => {
  try {
    const res = await URL.get("/users");
    const usersData = res.data.data.user;
    return {
      props: {
        usersData,
      },
    };
  } catch (error) {
    console.log(error.message);
    return {
      props: {
        usersData: [],
      },
    };
  }

  // will be passed to the page component as props
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
