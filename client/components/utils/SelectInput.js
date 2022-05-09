import React from 'react'

const SelectInput = ({data,name,id,onChange ,error ,value,...props}) => {
  return (
    <>
      <select
        className={`form-select form-select-lg rounded-pill mb-3 my-input fw-light ${
          error && "is-invalid"
        }`}
        aria-label=".form-select-lg example"
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        {...props}
      >
        <option value=""> Please select {name}</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <div className=" invalid-feedback mb-2 py-0">{error}</div>}
    </>
  );
}

export default SelectInput