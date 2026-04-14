import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { set, useForm } from "react-hook-form";

const Profile = () => {
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isEdit) {
      reset({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
      });
    }
  }, [isEdit]);

  function handleCancel() {
    reset({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    });
    setIsEdit(false);
  }

  return (
    <main className="max-w-7xl mx-auto p-3">
      <header className="mt-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-violet-500">MernAuth</h1>
        </nav>
      </header>

      <section className="mt-8">
        <div className="flex gap-18">
          <div className="w-75 h-75">
            <img
              src="https://randomuser.me/api/portraits/men/60.jpg"
              alt="profile image"
              className="w-full object-cover rounded-full"
            />
          </div>

          <div className="space-y-7 mt-4">
            <div>
              <p className="font-medium text-indigo-500 text-lg">Name</p>
              {isEdit ? (
                <input
                  type="text"
                  className="font-medium text-xl py-1.5 px-3 rounded-lg border"
                  {...register("name")}
                />
              ) : (
                <p className="font-medium text-2xl">{user?.name}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-indigo-500 text-lg">Email</p>
              {isEdit ? (
                <input
                  type="text"
                  className="font-medium text-xl py-1.5 px-3 rounded-lg border"
                  {...register("email")}
                />
              ) : (
                <p className="font-medium text-2xl">{user?.email}</p>
              )}
            </div>

            <div>
              <p className="font-medium text-indigo-500 text-lg">Mobile No.</p>
              {isEdit ? (
                <input
                  type="text"
                  className="font-medium text-xl py-1.5 px-3 rounded-lg border"
                  {...register("mobile")}
                />
              ) : (
                <p className="font-medium text-2xl">{user?.mobile}</p>
              )}
            </div>

            {isEdit ? (
              <div className="flex  gap-8">
                <button className="bg-linear-to-r from-green-700 to-green-600 text-white  py-2 px-6 w-fit text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer">
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-linear-to-r from-red-700 to-red-600 text-white  py-2 px-6 w-fit text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-linear-to-r from-violet-600 to-indigo-600 text-white  py-2 px-6 w-fit text-lg font-bold mt-3 rounded-md shadow-md cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
