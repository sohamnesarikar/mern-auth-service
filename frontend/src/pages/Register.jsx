import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { registerApi } from "../api/auth";
import { IoMdArrowBack } from "react-icons/io";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("mobile", data?.mobile);
    formData.append("password", data?.password);
    formData.append("avatar", file);

    try {
      const res = await registerApi(formData);

      if (res.status === 201 && res.data?.success) {
        toast.success(res.data?.message);
        reset();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-lg px-10 py-6">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack size={"1.7em"} className="text-purple-600" />{" "}
        <span className="text-md hover:underline text-purple-600">
          Go back to home
        </span>
      </div>
      <h1 className="text-center text-3xl font-bold my-6">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-32 h-32 my-3 mx-auto">
          <img
            src={preview || "/profile-picture.jpg"}
            alt="avatar"
            className="w-full rounded-full object-cover border"
          />

          <label className="absolute bottom-1 right-1 bg-indigo-600 p-1.5 rounded-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("avatar")}
              onChange={handleFileChange}
            />
            <IoCameraSharp size={25} className="text-white" />
          </label>
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md mt-1"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors?.name && (
            <p className="text-red-500 mt-1 text-sm">{errors?.name?.message}</p>
          )}
        </div>

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
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md mt-1"
            id="mobile"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^\d{10}$/, message: "Invalid mobile number" },
            })}
          />
          {errors?.mobile && (
            <p className="text-red-500 mt-1 text-sm">
              {errors?.mobile?.message}
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
          Register
        </button>
        <p className="text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
