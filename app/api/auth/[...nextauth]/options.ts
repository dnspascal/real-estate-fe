import type { NextAuthOptions,User  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import axiosInstance from '../../../../axiosInstance'


interface userProps{
    id:string,
    username:string,
    profile_picture:string
}

const options:NextAuthOptions ={


    pages: {
        signIn: '/signin',
        signOut: '/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',

        newUser: '/auth/new-user'
    },
    session: {
        strategy: "jwt",
    },
    providers:[
        CredentialsProvider({
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password",  type: "password" },
              },
            async authorize(credentials, req) {
               
               
                const res = await axiosInstance.post('/login',credentials,{
                    headers:{"Content-Type":"application/json"}
                })
                const user:userProps = await res.data.user
                
               
                if (res.status == 200 && user) {
                    console.log(user)
                    const sessionUser:User = {
                        id:user.id,
                        name:user.username,
                        image:user.profile_picture,
                    
                    }
                  return sessionUser
                }
              
                return null
              },
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
}

export default options