import React from 'react'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';

function CommonInput({ type, placeholder, value, onChange, name, label }) {

  const location = useLocation()


  return (
    <div>
      <div className="flex items-center">
        <Typography variant="h6" color="blue-gray">
          {label}
        </Typography>

        {
          location.pathname === '/register' && label === 'Name' ?
            <p className="text-sm text-gray-600 -mt-1 ml-4">(Must start with a capital letter and minimum three letters)</p>
            : null
        }

        {
          location.pathname === '/register' && label === 'Password' ?
            <p className="text-sm text-gray-600 -mt-1 ml-4">(Minimum length of 6. Only a-z and 0-9 allowed)</p>
            : null
        }

        {
          location.pathname === '/register' && label === 'Email' ?
            <p className="text-sm text-gray-600 -mt-1 ml-4">(Use 6+ characters, letters/numbers before @)</p>
            : null
        }
      </div>


      <Input
        size="md"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

    </div>
  )
}

export default CommonInput