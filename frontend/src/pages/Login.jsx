import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { getUserApi, loginApi } from "../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginApi(data);

      if (res.status === 200 && res.data?.success) {
        toast.success(res.data?.message);

        localStorage.setItem("isLoggedIn", true);

        // fetch user
        const userResponse = await getUserApi();
        setUser(userResponse?.data?.user);

        navigate("/dashboard");
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-lg px-10 py-10">
      <div className="flex items-center gap-4 mb-6">
        <IoMdArrowBack
          size={30}
          className="text-purple-600 cursor-pointer"
          onClick={() => navigate("/")}
        />{" "}
        <h1 className="text-3xl font-bold text-indigo-600">
          Login to your account
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="p-2 border border-gray-300 rounded-md mt-1"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors?.email && (
            <p className="text-red-500 mt-1 text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="p-2 border border-gray-300 rounded-md mt-1"
            id="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors?.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <div className="w-full text-right">
          <Link to={"/forgot-password"} className="text-indigo-500">
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-linear-to-r from-violet-600 to-indigo-600 text-white w-full py-3 text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Spinner />
              "Logging in..."
            </>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
