import { SESSION_STATUS } from "~/constants/constants";
import SignUp from "./SignUp";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const handleLogOut = async () => {
    await signOut({ redirect: false });
  };
  return status === SESSION_STATUS.UNAUTHENTICATED ? (
    <SignUp></SignUp>
  ) : (
    <>
      <div className="flex items-center justify-around p-4">
        <div>Hi {session?.user?.name}</div>
        <div className="mt-5 ">
          <button className="rounded-lg bg-blue-500 px-3 py-1 font-semibold text-white shadow-md hover:bg-blue-600" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
