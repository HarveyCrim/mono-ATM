import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_APIKEY!
        })
    ]
}