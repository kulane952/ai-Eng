import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
     //...other options
  emailAndPassword: { 
    enabled: true, 
     // for testing purposes
        minPasswordLength: 2,
        maxPasswordLength: 128,
  }, 
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema
    }),
     socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            accessType: "offline",           // Forces refresh token
            prompt: "select_account consent", // Forces consent screen
        },
    },
     // for next.js integration (https://better-auth.com/docs/integrations/next-js)
    plugins: [
        nextCookies(),
    ],
});