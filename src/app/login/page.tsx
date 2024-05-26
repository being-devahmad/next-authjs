'use client'

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("Login Success", response.data)
            router.push('/profile')
        } catch (error: any) {
            console.log('Login Failed')
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return <>
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? 'Processing' : "Login"}</h1>
            <hr/>

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
                onClick={onLogin}>
                {buttonDisabled ? 'No Login' : 'Login'}
            </button>

            <Link href={'/signup'}>New User ! Signup here </Link>
        </div>
    </>
}