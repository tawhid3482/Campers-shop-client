import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hook";
import { useGetUserQuery } from "@/redux/features/user/userApi";

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.userEmail || "");

  return (
    <div className="max-w-3xl mx-auto p-8 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">Name</p>
          <p className="text-xl font-medium text-gray-800 uppercase">{data?.data.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Email</p>
          <p className="text-xl font-medium text-gray-800">
            {data?.data.email}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Phone</p>
          <p className="text-xl font-medium text-gray-800">
            {data?.data.phone}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Role</p>
          <p className="text-xl font-medium text-gray-800">{data?.data.role}</p>
        </div>
        <div>
          <p className="text-gray-500">Created At</p>
          <p className="text-xl font-medium text-gray-800">
            {new Date(data?.data.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Updated At</p>
          <p className="text-xl font-medium text-gray-800">
            {new Date(data?.data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
