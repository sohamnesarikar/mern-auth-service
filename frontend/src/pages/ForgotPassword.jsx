import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [step, setStep] = useState(3);
  const navigate = useNavigate();
  const {
    register: emailRegister,
    handleSubmit: handleSendOtpSubmit,
    formState: { errors: emailErrors },
  } = useForm();

  const {
    register: otpRegister,
    handleSubmit: handleVerifyOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm();

  const {
    register: passwordRegister,
    handleSubmit: handleResetPasswordSubmit,
    formState: { errors: passwordErrors },
    watch,
  } = useForm();

  const password = watch("newPassword");

  function onSendOtp(data) {}

  function onVerifyOtp(data) {}

  function onResetPassword(data) {}

  return (
    <div className="max-w-lg w-full bg-white rounded-lg px-10 py-10">
      <div className="flex items-center gap-4 cursor-pointer mb-4">
        <IoMdArrowBack
          size={30}
          className="text-purple-600"
          onClick={() => navigate("/login")}
        />{" "}
        <h1 className="text-3xl font-bold text-indigo-600">Forgot Password</h1>
      </div>
      {step === 1 && (
        <form onSubmit={handleSendOtpSubmit(onSendOtp)}>
          <div className="flex flex-col my-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="p-2 border border-gray-300 rounded-md mt-1"
              id="email"
              {...emailRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {emailErrors?.email && (
              <p className="text-red-500 mt-1 text-sm">
                {emailErrors?.email?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-violet-600 to-indigo-600 text-white w-full py-3 text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtpSubmit(onVerifyOtp)}>
          <div className="flex flex-col my-3">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md mt-1"
              id="otp"
              {...otpRegister("otp", {
                required: "Otp is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Invalid otp",
                },
              })}
            />
            {otpErrors?.otp && (
              <p className="text-red-500 mt-1 text-sm">
                {otpErrors?.otp?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-violet-600 to-indigo-600 text-white w-full py-3 text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
          >
            Verify
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPasswordSubmit(onResetPassword)}>
          <div className="flex flex-col my-3">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded-md mt-1"
              id="new-password"
              {...passwordRegister("newPassword", {
                required: "New Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            {passwordErrors?.newPassword && (
              <p className="text-red-500 mt-1 text-sm">
                {passwordErrors?.newPassword?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              className="p-2 border border-gray-300 rounded-md mt-1"
              id="confirm-password"
              {...passwordRegister("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  return value === password || "Passwords do not match";
                },
              })}
            />
            {passwordErrors?.confirmPassword && (
              <p className="text-red-500 mt-1 text-sm">
                {passwordErrors?.confirmPassword?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-violet-600 to-indigo-600 text-white w-full py-3 text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
