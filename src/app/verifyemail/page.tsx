'use client'

import {useEffect, useState} from "react";
import axios from "axios";
// import {useRouter} from "next/router";
import Link from "next/link";

export default function VerifyEmailPage() {

    // const router = useRouter()

    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', {token})
            setVerified(true)
            setError(false)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    // just to take token from url
    useEffect(() => {
        setError(false)
        // JS methodology
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")

        // NextJs methodology
        // const {query} = router
        // const urlToken = query.token

    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token]);

    return <>
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>
                Verify Email
            </h1>
            <h2 className='p-3 bg-orange-500 text-black'>
                {token ? `${token}` : 'token not found'}
            </h2>

            {verified && (
                <div>
                    <h2>Verified Successfully</h2>
                    <Link href={'/login'}>Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2>Error 404</h2>
                </div>
            )}

        </div>
    </>
}