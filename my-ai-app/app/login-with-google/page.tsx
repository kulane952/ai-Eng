"use client"

import { createAuthClient } from "better-auth/react"

const  LoginWithGoogle =async()=>{
    const authClient=createAuthClient()

    return(
         <div className="flex justify-center items-center h-screen">
    <button className="bg-rose-500 text-white px-4 py-2 rounded-md" onClick={() => authClient.signIn.social({
        provider: "google",
    })}>Login with Google</button>
  </div>
    )
}

export default LoginWithGoogle