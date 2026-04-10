import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-lg px-10 py-12">
      <h1 className="text-center text-3xl font-bold mb-6">
        Login to your account
      </h1>
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

        <button
          type="submit"
          className="bg-linear-to-r from-violet-600 to-indigo-600 text-white w-full py-3 text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
        >
          Login
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
