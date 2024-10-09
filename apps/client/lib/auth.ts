import prisma from "@repo/db/client"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone : {label: "Phone Number", type: "text", placeholder: "(+1) XXX XXX XXXX"},
                password : {label: "Password", type: "password", placeholder: "*********"},
                email : {label: "Email", type: "email", placeholder: "Email"}
            },
            async authorize(credentials: any) {
                const password = await bcrypt.hash(credentials.password, 10)
                const userExists = await prisma?.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })

                if(userExists){
                    const valid = await bcrypt.compare(password, userExists.password)
                    if(valid)
                        return {
                            id: userExists.id.toString(),
                            email: userExists.email
                        }
                    else
                        return null
                }
                try{
                    const newUser = await prisma!.user.create({
                        data: {
                            number: credentials.phone,
                            email: credentials.email,
                            password
                        }
                    })
                    return {
                        id: newUser.id.toString(),
                        email: newUser.email
                    }
                }
                catch(err){
                    console.log(err)
                    return null
                }
            },
        })
    ],
    secret:process.env.NEXT_PUBLIC_JWT_SECRET,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            console.log(session, token)

            return session
        }
    }
}