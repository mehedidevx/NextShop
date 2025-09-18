import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { collectionName } from "./dbConnect";
import { signIn } from "next-auth/react";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "email", type: "text", placeholder: "Enter Your Email" },
                password: { label: "Password", type: "password", placeholder: "Enter Your Password" }
            },
            async authorize(credentials, req) {
                const user = await loginUser(credentials)
                if (user) {
                    return user
                } else {
                    return null
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account) {
                const { providerAccountId, provider } = account;
                const { email: user_email, image, name } = user;
                const usersCollection = dbConnect(collectionName.users);
                const isExist = await usersCollection.findOne({ providerAccountId })
                if (!isExist) {
                    const payload = { providerAccountId, provider, user_email, image, name }
                    await usersCollection.insertOne(payload)
                }
            }


            return true
        },
    }
}