import Link from "next/link";
import TextField from "../components/utils/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import { URL } from "./../apiConnection";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  name: yup.string().required("Please enter your name"),
  email: yup.string().required("Email field cannot be null"),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "password must not be less than 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  // terms:yup.boolean().required('You must accept our terms')
});
const signup = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STUDENT",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      URL.post("auth/signup", values)
        .then((res) => {
           if(res.data.token) router.push('/students/registration')
           window.user=res.data.user
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <div className="card col-sm-4 col-12 mx-auto my-auto shadow border ">
      <div className="card-body ">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="my-2 mb-4 text-center text-primary fw-bold">
            Create Account
          </h3>

          <p className="fs-6 text-center">Signup To Continue</p>
          <div className="me-3 ms-3">
            <TextField
              label="Username"
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name ? formik.errors.name : undefined}
            />
            <br />
            <TextField
              label="Email Address"
              type="text"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email ? formik.errors.email : undefined}
            />
            <br />
            <TextField
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.password ? formik.errors.password : undefined
              }
            />
            <br />
            <TextField
              label="Confirm password "
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
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
                  Agreed With Terms
                </label>
              </div>
              <button
                type="submit"
                className="btn float-end btn-primary  me-5 ms-5 rounded-pill "
              >
                SIGN UP
              </button>
            </div>
          </div>
          <div className="row col-12">
            <h6 className="text-center my-3">
              Already have an account?{" "}
              <span>
                <Link href="/login">Signin</Link>
              </span>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
