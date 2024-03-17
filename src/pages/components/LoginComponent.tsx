export const LoginComponent = () => {
  const handleLogIn = () => {
    console.log("LogIn Clicked");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="pb-5 text-center font-serif text-2xl">Log In</h1>
        <div>
          <label>Email</label>
          <br></br>
          <input
            type="text"
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mt-3">
          <label className="mt-5">Password</label>
          <br></br>
          <input
            type="password"
            className="rounded-sm bg-slate-100 p-1 font-mono shadow-sm"
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
        <div className="text-sm pt-2">
          Don't have an account?{" "}
          <a
            href="/SignUp"
            className="text-blue-600 hover:cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
