import { SESSION_STATUS } from "~/constants/constants";
import SignUp from "./SignUp";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserDetail } from "~/components/UserDetail";
import { CreateTask } from "~/components/CreateTask";
import { TeamDetail } from "~/components/TeamDetail";
import { ShowTask } from "~/components/ShowTask";
import { api } from "~/utils/api";

export interface CompleteUserData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dob: string;
  team: number;
}
export default function Home() {
  const { data: session, status } = useSession();
  const [step, setSteps] = useState<Number>(0);
  const {data:response} = api.user.getUserDetail.useQuery(session?.user?.email ?? '')
  const [userData, setUserData] = useState<CompleteUserData>({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    team: 0,
  });
  useEffect(()=>{
    setUserData((val) => ({
      ...val,
      name: response?.data.name || "",
      email: response?.data.email || "",
      phoneNumber: response?.data.phoneNumber || '',
      address: response?.data.address || "",
      dob: response?.data.dob || "",
      team: response?.data.team || 0,
    }));
  }, [response])

  const renderComponent = () => {
    if (step === 1) {
      return <UserDetail userData={userData} setUserData={setUserData} />;
    }
    if (step === 2) {
      return <CreateTask />;
    }
    if (step === 3) {
      return <TeamDetail />;
    }
    return <ShowTask />;
  };

  const handleLogOut = async () => {
    await signOut({ callbackUrl: `http://localhost:3000/SignIn` });
  };
  return status === SESSION_STATUS.UNAUTHENTICATED ? (
    <SignUp></SignUp>
  ) : (
    <div className="fixed inset-0 bg-slate-200">
      <div className="flex items-center justify-between bg-white pl-10 pr-10">
        <div className="cursor-pointer font-mono" onClick={() => setSteps(0)}>
          Hi! {session?.user?.name}
        </div>
        <div className="flex items-center justify-around">
          <div
            className="ml-4 mr-4 cursor-pointer p-2 font-semibold hover:bg-white"
            onClick={() => setSteps(1)}
          >
            User
          </div>
          <div
            className="ml-4 mr-4 cursor-pointer p-2 font-semibold hover:bg-white"
            onClick={() => setSteps(2)}
          >
            Create Task
          </div>
          <div
            className="ml-4 mr-4 cursor-pointer p-2 font-semibold hover:bg-white"
            onClick={() => setSteps(3)}
          >
            Team
          </div>
        </div>
        <button
          className="rounded-lg bg-blue-500 px-3 py-1 font-semibold text-white shadow-md hover:bg-blue-600"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>

      {renderComponent()}
    </div>
  );
}
