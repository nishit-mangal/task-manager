import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/utils/api";

export interface User {
  email:string,
  password:string
}
export interface SignUpUser extends User{
  name:string
}

export default function SignUpComponent  ()  {
  const route = useRouter()
  const [data, setData] = useState<SignUpUser>({
    name: "",
    email: "",
    password: "",
  });
  
  const mutation = api.user.create.useMutation()
  const handleSignup = ()=>{
    if(data.name.length===0 || data.email.length===0 || data.password.length===0){
      alert('All fields are required')
      return
    }
    try {
      mutation.mutate(data, {
        onSuccess:(result)=>{
          if(result.resposneCode!==200){
            alert(result.responseMessage)
            return
          } // Log the greeting after successful mutation
          route.push('/SignIn');
        },
        onError:(error)=>{
          throw error
        }
      })
    } catch (error) {
      console.error('Error while greeting:', error);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="pb-6 text-center font-serif text-2xl">Sign Up</h1>
        <div>
          <label>Name</label>
          <br></br>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
            placeholder="Example Sharma"
          />
        </div>
        <div className="mt-3">
          <label>Email</label>
          <br></br>
          <input
            type="email"
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
            required
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
        <div className="mb-4 mt-5 flex items-center justify-center">
          <button
            onClick={handleSignup}
            className="rounded-lg bg-blue-500 px-3 py-1 font-semibold text-white shadow-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
        <div className="text-sm">
          Already have an account?{" "}
          <a href="/SignIn" className="text-blue-600 hover:cursor-pointer">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};
