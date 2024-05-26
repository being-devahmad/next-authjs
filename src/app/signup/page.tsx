'use client'

import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup Success", response.data)
            router.push('/login')
        } catch (error: any) {
            console.log('SignUp Failed')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return <>
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? 'Processing' : "Signup"}</h1>
            <hr/>

            {/*Username*/}
            <label htmlFor="username">Username</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4
                           focus:outline-nonefocus:border-gray-600 text-black'
                type="text"
                id={'username'}
                value={user.username}
                placeholder="Enter your username"
                onChange={(e) =>
                    setUser({...user, username: e.target.value})}/>

            {/*Email*/}
            <label htmlFor="email">Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4
                           focus:outline-nonefocus:border-gray-600 text-black'
                type="text"
                id={'email'}
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) =>
                    setUser({...user, email: e.target.value})}/>

            {/*Password*/}
            <label htmlFor="password">password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4
                           focus:outline-none focus:border-gray-600 text-black'
                type="text"
                id={'password'}
                value={user.password}
                placeholder="Enter your password"
                onChange={(e) =>
                    setUser({...user, password: e.target.value})}/>

            <button
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                onClick={onSignUp}>
                {buttonDisabled ? 'No Signup' : 'Signup'}
            </button>

            <Link href={'/login'}>Already have an account ! Login </Link>
        </div>
    </>
}