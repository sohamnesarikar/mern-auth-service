import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-linear-to-r from-violet-600 to-indigo-600 flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
