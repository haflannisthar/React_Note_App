import { Route, Routes } from "react-router-dom"
import { RegistrationForm } from "./Register/Register"
import { LoginForm } from "./Login/login"
import AuthPage from "./AuthPage/AuthPage"
import Profile from "./Profile/Profile"


function App() {

  return (

    <div>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/note" element={
          <AuthPage>
            <Profile />
          </AuthPage>
        } />
      </Routes>
    </div>
  )
}

export default App
