import { useNavigate } from "react-router";
import { logoutApi } from "../api/auth";
import { useAuth } from "../context/useAuth";
import { toast } from "react-toastify";

const Home = () => {
  const { user, setUser } = useAuth();
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
      <header>
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-violet-500">MernAuth</h1>
          <button
            className="hover:text-purple-500 text-lg cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </nav>
      </header>
      <section className="mt-8">
        <h2 className="text-3xl font-semibold">Welcome Back, {user?.name} </h2>
      </section>
    </main>
  );
};

export default Home;
