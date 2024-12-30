import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import connectDB from './db/db'
import UserModel from '@/db/models/UserSchema'
import { v4 } from 'uuid'
import console from 'console'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectDB()

        const existingUser = await UserModel.findOne({ email: user.email })

        if (existingUser) {
          token.userid = existingUser.userid
        } else {
          const newUser = new UserModel({
            userid: v4(),
            email: user.email,
            fullname: user.name,
            image_url: user?.image
          })

          await newUser.save()
          token.userid = newUser.userid
        }
      }
      return token
    },
    async session({ session, token }: any) {
      session.userid = token.userid
      return session
    }
  }
})
