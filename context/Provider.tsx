'use client'
import { SessionProvider } from "next-auth/react"

interface ProviderProps{
    children:React.ReactNode,
    session?:{
        name:string,
        image:string,
        expires:string
    }
}

export default function Provider({children,session}:ProviderProps) {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}
