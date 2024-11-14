import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography, Alert
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import background_animation from '../assets/background.json'
import CommonForm from "../Common/CommonForm";
import { auth } from '../firebaseConfig'
import { RegistrationFromControls } from '../Common/Config';
import { AuthContext } from "../Context/Context";
import { updateProfile } from 'firebase/auth'
import { useLocation, useNavigate } from "react-router-dom";
import AlertIcon from "../assets/Icons/Alert";


export function RegistrationForm() {


  const location = useLocation()

  const [open, setOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate()

  const { registerFormData, setRegisterFormData, setLoading, RegisterWithFirebase } = useContext(AuthContext)

  const [errorMessage, setErrorMessage] = useState('');



  function handleRegisterFormSubmit(event) {

    event.preventDefault();

    console.log(registerFormData);

    const nameBoolean = (/^[A-Z][a-z]{2,}$/).test(registerFormData.name)
    console.log("nameBoolean", nameBoolean);

    const emailBoolean = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(registerFormData.email)
    console.log("emailBoolean", emailBoolean);

    const passwordBoolean = (/^[a-zA-Z0-9]{6,}$/).test(registerFormData.password)
    console.log("passwordBoolean", passwordBoolean);

    if (nameBoolean && emailBoolean && passwordBoolean) {
      console.log("im here inside");

      RegisterWithFirebase()
        .then(result => {
          console.log(result);

          if (result.user) {
            updateProfile(result.user, {
              displayName: registerFormData.name
            }).then(() => {
              console.log(auth.currentUser.displayName, 'auth.currentUser.displayName');

              if (auth.currentUser.displayName) {
                setLoading(false)
                navigate('/note')
                setRegisterFormData({
                  name: '',
                  email: '',
                  password: ''
                })

              }

            })
          }
        })
        .catch(

          setErrorMessage("Registration failed. Try again later.")

        )
    } else {
      console.log("im here outside");
      setOpen(true);
      setErrorMessage("Form has some errors. Check again.");

    }






  }



  useEffect(() => {
    console.log(open);

    if (open) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setOpen(false), 1500);
      }, 2000);


      return () => clearTimeout(timer);
    }
  }, [open]);



  return (



    <div>
      {open && (
        <Alert color="red"
          className={`absolute top-0 right-0 max-w-sm mt-2 mr-2 z-20 transition-opacity duration-1500  ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
          icon={<AlertIcon />}
        >
          <Typography variant="h5" color="white">Error</Typography>
          <Typography color="white" className="mt-2 font-normal">{errorMessage}</Typography>
        </Alert>
      )}

      <div className="flex items-center justify-center h-screen bg-gray-900">

        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <Lottie animationData={background_animation} loop={true} />
        </div>

        {/* Form container */}
        <div className="relative z-10 bg-white rounded-lg p-4 sm:p-8 sm:w-[90%] md:w-[500px] lg:w-[600px] max-w-lg mx-auto">
          <Card color="transparent" shadow={false}>
            {
              location?.pathname === '/login' ?
                <Typography variant="h4" color="blue-gray" className="text-center">
                  Sign In
                </Typography>
                :
                <Typography variant="h4" color="blue-gray" className="text-center">
                  Sign Up
                </Typography>
            }

            {
              location?.pathname === '/login' ?
                <Typography color="gray" className="mt-1 font-normal text-center">
                  Nice to meet you! Enter your details to login.
                </Typography>
                :
                <Typography color="gray" className="mt-1 font-normal text-center">
                  Nice to meet you! Enter your details to register.
                </Typography>
            }




            <CommonForm
              formControls={RegistrationFromControls}
              formData={registerFormData}
              setFormData={setRegisterFormData}
              onSubmit={handleRegisterFormSubmit}


            />
          </Card>
        </div>
      </div>
    </div>


  );
}