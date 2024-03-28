import { z } from "zod";
import bcrypt from "bcrypt";

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
const CompleteUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().length(10).optional(),
  address: z.string().optional(),
  dob: z.string().optional(),
  team: z.number().min(0).optional()
})
export interface CompleteUserDataOptional {
  name: string;
  email: string;
  phone_number: string | null;
  address: string | null;
  date_of_birth: Date | null;
  team: number;
}
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const existingUser = await db.user.findUnique({
          where: {
            email: input.email,
          },
        });
        if (existingUser) {
          throw new Error(`User with email: ${input.email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);
        let newUser = await db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
          },
        });
        return {
          resposneCode: RESPONSE_CODE.SUCCESS,
          responseMessage: "New User Created Successfully",
          data: newUser,
        };
      } catch (error: any) {
        console.log(error);
        return {
          resposneCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
          responseMessage:
            error.message ?? RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
          data: null,
        };
      }
    }),

  getUserDetail: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input,
        },
      });
      if (!user) {
        throw Error(`User Not Found with email: ${input}`);
      }

      return {
        resposneCode: RESPONSE_CODE.SUCCESS,
        responseMessage: "New User Created Successfully",
        data: {
          name: user.name ?? "",
          email: user.email ?? "",
          phoneNumber: user.phone_number ?? "",
          address: user.address ?? "",
          dob: user.date_of_birth?.toISOString().slice(0, 10) ?? "",
          team: user.team ?? 0,
        },
      };
    }),

  updateUserDetail: protectedProcedure
  .input(CompleteUserSchema)
  .mutation(async ({input})=>{
    console.log(input)
    const existingUser = await db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    // If user with given email exists, update their details
    if (existingUser) {
      let finalObj:CompleteUserDataOptional = {
        name:input.name,
        email:input.email,
        phone_number:input.phoneNumber ?? null,
        address:input.address ?? null,
        team:input.team ?? 0,
        date_of_birth:null
      }
      if(input && input.dob && input.dob?.length!==0)
          finalObj.date_of_birth = new Date(input.dob)
      const updatedUser = await db.user.update({
        where: {
          email: input.email,
        },
        data: finalObj,
      });
      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  }),
  getAllUserDetail: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await db.user.findMany({
        select:{
          id:true,
          name:true
        }
      });
      return {
        user
      }
    }),
});
