import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import background_animation from '../assets/background.json'
import { useNavigate } from "react-router-dom";
import CommonForm from "../Common/CommonForm";
import { LoginFormControls } from "../Common/Config";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/Context";


export function LoginForm() {
  const { loginFormData, setLoginFormData, loginWithFirebase, setLoading, setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLoginOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(false);

    try {
      const userCredential = await loginWithFirebase();
      setUser(userCredential.user);

      setLoading(true);

      setLoginFormData({
        email: '',
        password: ''
      });


      setTimeout(() => {
        navigate('/note');
      }, 1000);

      setErrorMessage("");


    } catch (error) {
      setErrorMessage("Invalid credentials, please try again.");
      setLoading(false);
      console.error(error);
    }
  };


  function handlePasswordReset() {
    
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="absolute inset-0 z-0">
        <Lottie animationData={background_animation} loop={true} />
      </div>

      <div className="relative z-10 bg-white rounded-lg p-4 sm:p-8 sm:w-[90%] md:w-[500px] lg:w-[600px] max-w-lg mx-auto">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to login.
          </Typography>

          {/*  error message if login fails */}
          {errorMessage && (
            <div className="bg-red-100 p-4 rounded">
              <Typography color="red-800" className="mt-1 font-normal text-center">
                {errorMessage}
              </Typography>
            </div>

          )}

          <CommonForm
            formControls={LoginFormControls}
            formData={loginFormData}
            setFormData={setLoginFormData}
            onSubmit={handleLoginOnSubmit}
          />
           {/* <Button variant="text">text</Button> */}
           <Typography
                  as="button"
                  href=""
                  onClick={handlePasswordReset()}
                 color="blue-gray" 
                  className="font-medium !text-gray-500 text-center transition-colors hover:!text-gray-900"
                >
                 Forget Password ?
                </Typography>
        </Card>
      </div>

      
    </div>
  );
}