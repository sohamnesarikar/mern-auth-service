import { Outlet, useNavigate } from "react-router";
import { logoutApi } from "../api/auth";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";

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
            onClick={() => navigate("/")}
          >
            MernAuth
          </h1>

          <div className="flex items-center gap-6">
            <div className="w-12 h-12">
              <img
                src="https://randomuser.me/api/portraits/men/60.jpg"
                alt="profile image"
                className="object-cover rounded-full border border-indigo-700 shadow-lg cursor-pointer animate-bounce delay-500"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </div>
            <button
              className="hover:text-purple-500 text-lg cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </button>
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
