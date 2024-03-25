import { z } from "zod";
import bcrypt from "bcrypt"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { RESPONSE_CODE, RESPONSE_MESSAGE } from "~/constants/constants";

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
const SignUpSchema = UserSchema.extend({
  name: z.string(),
});

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx, input }) => {
      try{
        const existingUser = await db.user.findUnique({
          where:{
            email:input.email
          }
        })
        if(existingUser){
          throw new Error(`User with email: ${input.email} already exists`)
        }
        
        const hashedPassword = await bcrypt.hash(input.password, 10)
        let newUser = await db.user.create({
          data:{name:input.name,
          email:input.email,
          password:hashedPassword}
        })
        return {
          resposneCode:RESPONSE_CODE.SUCCESS,
          responseMessage:'New User Created Successfully',
          data:newUser
        };
      }catch(error:any){
        console.log(error)
        return {
          resposneCode:RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          responseMessage:error.message??RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
          data:null
        }
      }
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
