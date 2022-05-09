import SelectInput from "./utils/SelectInput";
import TextField from "./utils/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import { handleStateOptions,handleLgaOptions,lgaList  } from "./utils/statesAndLga";
import { useCallback, useEffect, useState } from "react";

const validationSchema = yup.object({
  surname: yup.string().required("surname must not be empty"),
  gender: yup.string().required("Please select gender"),
});

const RegistrationForm = ({isUpdate}) => {
  const [lgaOptions, setLgaOptions] = useState([]);
  const stateOptions=handleStateOptions()
  const onStatesChange = () => setLgaOptions(handleLgaOptions(lgaList[formik.values.state]));
  



  const formik = useFormik({
    initialValues: {
      id: "",
      firstname: "",
      otherNames: "",
      surname: "",
      dob: "",
      formerSchool: "",
      phoneNumber: "",
      level: "",
      gender: "",
      state: '',
      lga: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      if (isUpdate) {
        console.log('is updating....')
      } else {
        console.log("is creatin........");
      }
      
    },
  });

  useEffect(() => {
    onStatesChange();
  }, [formik.values.state]);


  return (
  
      <div className="card-body col-sm-10 mx-auto my-auto">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Surname"
            name="surname"
            id="surname"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.surname}
            error={formik.errors.surname ? formik.errors.surname : undefined}
          />
          <TextField
            label="First Name"
            name="firstname"
            id="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={
              formik.touched.firstname && formik.errors.firstname
                ? formik.errors.firstname.toString()
                : undefined
            }
          />

          <TextField
            label="Other Names"
            name="otherNames"
            id="otherNames"
            type="text"
          />
          <SelectInput
            name="gender"
            id="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.errors.gender ? formik.errors.gender : undefined}
            data={[
              {
                label: "Male",
                vaue: "Male",
              },
              {
                label: "Female",
                vaue: "Female",
              },
            ]}
          />
          <TextField label="DOB" name="dob" id="dob" type="date" />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            type="text"
          />
          <TextField
            label="Contact Address"
            name="contactAddress"
            id="contactAddress"
            type="text"
          />
          <SelectInput
            name="Level"
            id="level"
            data={[
              {
                label: "JSS1",
                vaue: "JSS1",
              },
              {
                label: "JSS2",
                vaue: "JSS2",
              },
            ]}
          />
          <TextField
            label="Former School Attended"
            name="formerSchool"
            id="formerSchool"
            type="text"
          />
          <SelectInput
            name="state"
            id='state'
            data={stateOptions}
            onChange={formik.handleChange}
          />
          <SelectInput
            name="lga"
            data={lgaOptions}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="float-end btn btn-primary btn-lg rounded-pill"
          >
           {isUpdate? "UPDATE":"REGISTER"}
          </button>
        </form>
      </div>
 
  );
};

export default RegistrationForm;
