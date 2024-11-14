import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Lottie from "lottie-react";
import Load_animation from '../assets/Load_animation.json'


export const AuthContext = createContext(null)


export default function AuthState({ children }) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    })



    function RegisterWithFirebase() {
        setLoading(true)
        console.log(registerFormData);

        const { email, password } = registerFormData
        return createUserWithEmailAndPassword(auth, email, password)

    }



    async function loginWithFirebase() {
        setLoading(true)
        const { email, password } = loginFormData
        // console.log(signInWithEmailAndPassword(auth,email,password));

        // return signInWithEmailAndPassword(auth,email,password)



        try {
            setLoading(false);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }


    }


    function hangleLogOut() {
        setLoading(true)

        return signOut(auth)
    }


    useEffect(() => {
        const checkAuthState = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setTimeout(() => setLoading(false), 2000);
        })

        return () => {
            checkAuthState()
        }
    }, [])







    useEffect(() => {
        if (user) {
            navigate('/note')
        }
    }, [user])


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-24 h-24"> {/* Adjust width and height to control animation size */}
                    <Lottie animationData={Load_animation} loop={true} />
                </div>
            </div>

        );

    }

    // https://lottiefiles.com/free-animation/loading-33sOeTYkDc



    return <AuthContext.Provider value={{
        registerFormData,
        setRegisterFormData,
        loading,
        setLoading,
        RegisterWithFirebase,
        loginFormData,
        setLoginFormData,
        loginWithFirebase,
        user, setUser, hangleLogOut
    }}>{children}</AuthContext.Provider>

}

