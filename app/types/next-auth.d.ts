// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"

// ----------------------
// App-specific User Types
// ----------------------
export interface AuthUser {
  id: string
  username: string
  fullName: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

// Optional: custom token type (mirror ของ JWT หลัง augment แล้ว)
export interface JWTToken {
  id: string
  username: string
  fullName: string
  role: "user" | "admin"
  iat?: number
  exp?: number
}

// ----------------------
// NextAuth Module Augmentation
// ----------------------
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string
    username: string
    fullName: string
    role: "user" | "admin"
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      fullName: string
      role: "user" | "admin"
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    fullName: string
    role: "user" | "admin"
  }
}
