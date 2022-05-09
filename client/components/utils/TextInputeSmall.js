import React from 'react'

const TextInputeSmall = ({name,onChange,label,type, placeholder}) => {
  return (
      <input className="form-control rounded-pill" type={type}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          
      />
  )
}

export default TextInputeSmall