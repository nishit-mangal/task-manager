import { useState } from "react";
import { User } from "./SignUpComponent";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RESPONSE_CODE } from "~/constants/constants";

export const LoginComponent = () => {
  const router = useRouter()
  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });
  const handleLogIn = async () => {
    const loginRes = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log(loginRes)
    if(loginRes?.status === RESPONSE_CODE.SUCCESS){
      router.push('/')
    }else{
      alert('Invalid Credentials')
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="pb-5 text-center font-serif text-2xl">Log In</h1>
        <div>
          <label>Email</label>
          <br></br>
          <input
            type="email"
            required
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-3">
          <label className="mt-5">Password</label>
          <br></br>
          <input
            type="password"
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
            required
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            placeholder="Password"
          />
        </div>
        <div className="mt-5 flex items-center justify-center">
          <button
            onClick={handleLogIn}
            className="rounded-lg bg-blue-500 px-3 py-1 font-semibold text-white shadow-md hover:bg-blue-600"
          >
            Log In
          </button>
        </div>
        <div className="pt-2 text-sm">
          Don't have an account?{" "}
          <a href="/SignUp" className="text-blue-600 hover:cursor-pointer">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
