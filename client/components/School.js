import TextField from "./utils/TextField";
import SelectInput from "./utils/SelectInput";
import {handleStateOptions} from '../components/utils/statesAndLga'

const School = () => {
  const stateOptions = handleStateOptions();
  return (
    <div className=" card shadow container  col-sm-8 mx-auto my-auto">
      <div className="card-body">
        <TextField label="School Name" name="name" id="name" type="text" />
        <TextField
          label="Abreviation"
          name="shortName"
          id="shortName"
          type="text"
        />
        <TextField label="Location" name="location" id="location" type="text" />
        <SelectInput name="state" id="state" data={stateOptions} />
        <TextField label="Telephone" name="phone" id="phone" type="text" />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          id="phoneNumber"
          type="text"
        />
        <TextField
          label="School Logo"
          name="logo"
          type="file"
          id="logo"
         
        />


        <button className="float-end btn btn-primary rounded-pill">
          Register
        </button>
      </div>
    </div>
  );
}

export default School