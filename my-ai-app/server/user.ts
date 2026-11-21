"use server"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export async function getUser(){
    const session=await auth.api.getSession({
        headers:await headers()
    })
    return session
}

//signup

export async function signup(email:string,password:string){
    const user=await auth.api.signUpEmail({
        body:{
            name:email.split("@")[0],
            email,
            password,
        }
    })
    return user
}

export async function login(email:string,password:string){
    await auth.api.signInEmail({
        body:{
            email,
            password,
        }
    })
}