import React from "react";
const TextField = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  id,
  value,
  onBlur,
  error,
  ...props
}) => {
  return (
    <>
      <div className={`form-floating  mb-3  `}>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          {...props}
          className={`form-control rounded-pill my-input ${
            error && "is-invalid"
          }`}
        />
        <label htmlFor="floatingInput">{label}</label>
        {error && <div className=" invalid-feedback mb-2 py-0">{error}</div>}
      </div>
    </>
  );
};

export default TextField;
