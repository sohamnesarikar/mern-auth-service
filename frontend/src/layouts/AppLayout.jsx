import { Outlet, useNavigate } from "react-router";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import { logoutApi } from "../api/auth";
import { useAuth } from "../context/useAuth";

const AppLayout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await logoutApi();
      if (res.status === 200 && res?.data?.success) {
        toast.success(res?.data?.message);
        localStorage.removeItem("isLoggedIn");
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-3">
      <header className="mt-4">
        <nav className="flex justify-between items-center">
          <h1
            className="text-3xl font-bold text-violet-500 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            MernAuth
          </h1>

          <div className="flex items-center gap-6">
            <div className="w-12 h-12">
              <img
                src="https://randomuser.me/api/portraits/men/60.jpg"
                alt="profile image"
                className="object-cover rounded-full border border-indigo-700 shadow-lg cursor-pointer hover:scale-105"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </div>
            <AiOutlineLogout
              className="hover:text-purple-500 text-lg cursor-pointer"
              size={25}
              onClick={logoutHandler}
            />
          </div>
        </nav>
      </header>
      <section className="mt-8">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
