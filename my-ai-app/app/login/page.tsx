"use client"

import { useForm } from "react-hook-form"
import { login } from "../../server/user"  
import { useState } from "react"
const LoginPage = () => {


  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  const onSubmit = (data: any) => {
    login(data.email, data.password)
    .then(() => {
        setError("")
        setSuccess("Login successful")
    })
    .catch((error) => {
        setError(error.message)
        setSuccess("")
    })
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input placeholder="Email" className="border border-gray-300 rounded-md p-2" type="email" {...register("email")} />
            <input placeholder="Password" className="border border-gray-300 rounded-md p-2" type="password" {...register("password")} />
            <button className="bg-rose-500 text-white rounded-md p-2" type="submit">Login</button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
    </div>
  )
}

export default LoginPage