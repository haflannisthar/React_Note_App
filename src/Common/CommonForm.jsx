import React, { useState } from 'react'
import CommonInput from './CommonInput';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';


const formElementType = {
  INPUT: 'input',
  SELECT: 'select',
  TEXTAREA: 'textarea'
}

function CommonForm({ formControls = [], setFormData, formData, onSubmit }) {


  const [checkBoxCheck,setCheckBoxCheck]=useState(false)

  const location = useLocation()

  function renderFormElement(getFormControl, getFormData) {


    let Element = null

    switch (getFormControl.componentType) {
      case formElementType.INPUT:

        Element = <CommonInput
          label={getFormControl.label}
          type={getFormControl.type}
          placeholder={getFormControl.placeholder}
          value={getFormData[getFormControl.name]}
          name={getFormControl.name}
         
          onChange={(event) => setFormData({
            ...formData,
            [getFormControl.name]: event.target.value
          })}
        />
        break;

      default:
        Element = <CommonInput
          label={getFormControl.label}
          type={getFormControl.type}
          placeholder={getFormControl.placeholder}
          value={getFormData[getFormControl.name]}
          name={getFormControl.name}
          onChange={(event) => setFormData({
            ...formData,
            [getFormControl.name]: event.target.value
          })}
        />
        break;
    }


    return Element
  }


  return (
    <form className="mb-2 mt-5 w-full" onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        {
          formControls.map((formControl) => renderFormElement(formControl, formData))
        }

      </div>


      {
        location?.pathname === '/login' ?
          null :
          <Checkbox

          onChange={()=>setCheckBoxCheck(!checkBoxCheck)}
          checked={checkBoxCheck}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
      }


      {/* Submit button */}


      {
        location?.pathname === '/login' ?
          <Button className="mt-4" type='Submit' fullWidth>
            Sign In
          </Button>
          :
         ( <Button className="mt-4" type='Submit' fullWidth  disabled={!checkBoxCheck}>
            Sign Up
          </Button>)
      }

      {/* Sign-in link */}

      {
        location?.pathname === '/login' ?
        <Typography color="gray" className="mt-1 text-center font-normal">
        Don't have an account?{" "}
        <a href="/register" className="font-medium text-gray-900">
          Sign Up
        </a>
      </Typography>
          :
          null
      }

{
        location?.pathname === '/register' ?
        <Typography color="gray" className="mt-1 text-center font-normal">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-gray-900">
          Sign Up
        </a>
      </Typography>
          :
          null
      }



    </form>
  )
}

export default CommonForm