import { type } from "os";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CompleteUserData } from "~/pages";
import { api } from "~/utils/api";

export const UserDetail: React.FC<{
  userData: CompleteUserData;
  setUserData: Dispatch<SetStateAction<CompleteUserData>>;
}> = ({ userData, setUserData }): JSX.Element => {
  const mutation = api.user.updateUserDetail.useMutation();
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const handleUserData = () => {
    mutation.mutate(userData, {
      onSuccess: (result) => {
        alert("User Updated Successfully");
        console.log(result);
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  useEffect(() => {
    !!isSaveDisabled && setIsSaveDisabled((value) => !value);
    return;
  }, [userData]);
  return (
    <div className="relative mt-10 flex items-center justify-center">
      <div className="rounded-md bg-white p-8 shadow-sm">
        <h1 className="pb-5 text-center font-serif text-2xl">User Details</h1>
        <div className="flex items-center justify-center">
          <div className="p-2">
            <label>Name</label>
            <br></br>
            <input
              type="text"
              readOnly={true}
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              value={userData.name}
            />
          </div>
          <div className="p-2">
            <label>Email</label>
            <br></br>
            <input
              type="email"
              readOnly={true}
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              value={userData.email}
            />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <div className="p-2">
            <label>Phone Number</label>
            <br></br>
            <input
              type="text"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              value={userData.phoneNumber}
              onChange={(e) => {
                setUserData({ ...userData, phoneNumber: e.target.value });
              }}
            />
          </div>
          <div className="p-2">
            <label>Address</label>
            <br></br>
            <input
              type="text"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              value={userData.address}
              onChange={(e) => {
                setUserData({ ...userData, address: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="p-2">
            <label>Date of Birth</label>
            <br></br>
            <input
              type="date"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              defaultValue={userData.dob}
              onChange={(e) => {
                setUserData({ ...userData, dob: e.target.value });
              }}
            />
          </div>
          <div className="p-2">
            <label>Team</label>
            <br></br>
            <input
              type="number"
              required
              className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
              value={userData.team}
              min={0}
              onChange={(e) => {
                setUserData({ ...userData, team: parseInt(e.target.value) });
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className={`rounded-lg px-3 py-1 font-medium text-white shadow-md ${isSaveDisabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={handleUserData}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
