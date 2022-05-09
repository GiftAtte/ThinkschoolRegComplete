import Link from "next/link";
import React from "react";
import TextField from "../components/utils/TextField";
import {useFormik} from 'formik'
import * as yup from 'yup'
import {URL} from '../apiConnection'


const validationSchema = yup.object({
  email: yup.string().required('please enter email'),
  password:yup.string().required('Enter password')
})



const login = () => {
   
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      URL.post('auth/login',values)
        .then(res => {
        console.log(res.data)
        })
        .catch(err => {
        console.log(err)
      })
    }
 })
  return (
    <div className="card  col-sm-4 col-12 mx-auto my-auto shadow  ">
      <div className="card-body row me-3">
        <h3 className="my-2 mb-4 text-center text-primary fw-bold">
          Welcome Back!
        </h3>

        <p className="fs-6 text-center">Signin To Continue</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="me-3 ms-3 ">
            <TextField
              label="Email Address"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <br />
            <TextField
              label="Password Address"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />

            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label className="form-check-label" htmlFor="inlineCheckbox1">
                  Remember me
                </label>
              </div>
              <button className="btn float-end btn-primary  me-1  rounded-pill ">
                LOGIN
              </button>
            </div>
            <div className="row col-12">
              <h6 className="text-center my-3">
                Don't have an account?{" "}
                <span>
                  <Link href="/signup">Signup</Link>
                </span>
              </h6>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default login;
