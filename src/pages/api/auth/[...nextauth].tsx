import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID as string,
            clientSecret: process.env.DISCORD_SECRET as string
        }),
        // CredentialsProvider({
        //     // The name to display on the sign in form (e.g. "Sign in with...")
        //     name: "Credentials",
        //     // `credentials` is used to generate a form on the sign in page.
        //     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "jsmith" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         // Add logic here to look up the user from the credentials supplied
        //         const { username, password } = credentials as { username: string, password: string }

        //         if (user) {
        //             // Any object returned will be saved in `user` property of the JWT
        //             return user
        //         } else {
        //             // If you return null then an error will be displayed advising the user to check their details.
        //             return null

        //             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //         }
        //     }
        // })
    ]
})
