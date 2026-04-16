import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { updateProfilePicture, updateUserProfile } from "../api/auth";
import { toast } from "react-toastify";
import { IoCameraSharp } from "react-icons/io5";

const Profile = () => {
  const { user, setUser } = useAuth();
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

  const onSubmit = async (data) => {
    try {
      const res = await updateUserProfile(data);
      if (res.status === 200 && res.data?.success) {
        setUser(res?.data?.user);
        setIsEdit(false);
        toast.success("User profile update successfully");
      }
    } catch (error) {
      toast.error("User profile update failed");
    }
  };

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await updateProfilePicture(formData);
      if (res.status === 200 && res.data?.success) {
        setUser({ ...user, avatar: res?.data?.avatar });
        toast.success("User profile update successfully");
      }
    } catch (error) {
      toast.error("Profile picture update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-18">
        <div className="relative w-75 h-75">
          <img
            src={user?.avatar?.imageUrl || "./profile-picture.jpg"}
            alt="profile image"
            className="w-full object-cover rounded-full"
          />

          <label className="absolute bottom-6 right-6 bg-indigo-500 rounded-full p-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              onChange={handleProfileImage}
              className="hidden"
            />
            <IoCameraSharp size={25} className="text-white" />
          </label>
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
    </form>
  );
};

export default Profile;
