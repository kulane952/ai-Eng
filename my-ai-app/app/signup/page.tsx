"use client"
import { signup } from "@/server/user"
import { useState } from "react"
import { useForm } from "react-hook-form"


 const signupPage=()=>{
    const [error,setError]=useState("")
    const {register,handleSubmit}=useForm()

    const onSubmit=(data:any)=>{
        signup(data.email, data.password).then(()=>{
            setError("")
        }).catch((error)=>{
            setError(error.message)

        })
    }

    return(
        <div className="flex flex-col items-center justify-center h-screen">

            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-4">
                <input className="border border-gray-300 rounded-md p-2" type="email" {...register("email",{required: true,pattern: /^\S+@\S+$/i })} />
                {/* pattern: /^\S+@\S+$/i  */}
                <input className="border border-gray-300 rounded-md p-2" type="password" {...register("password",{required:true,minLength:2,maxLength:20})}/>
                <button className="bg-rose-500 text-white rounded-md p-2" type="submit">Signup</button>

            </form>
            {error && <p className="text-red-500">{error}</p>}

        </div>
    )
}

export default signupPage