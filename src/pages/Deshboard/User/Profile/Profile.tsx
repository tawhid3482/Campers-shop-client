import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/features/hook";
import { useGetUserQuery } from "@/redux/features/user/userApi";
import { FaUserCircle, FaEnvelope, FaPhone, FaUserShield, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.userEmail || "");

  const userInfo = data?.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto ">
        <div className="bg-white h-screen shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
          
          {/* Sidebar / Avatar */}
          <div className="bg-gradient-to-br from-[#833d47] to-green-600 text-white flex flex-col items-center justify-center p-8">
            <FaUserCircle className="text-8xl mb-4 drop-shadow-lg" />
            <h2 className="text-2xl font-bold">{userInfo?.name}</h2>
            <p className="text-sm mt-1">{userInfo?.email}</p>
            <span className="mt-4 px-4 py-1 rounded-full bg-white text-[#833d47] text-sm font-semibold">
              {userInfo?.role}
            </span>
          </div>

          {/* Info Section */}
          <div className="md:col-span-2 p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Profile Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p className="text-lg font-medium text-gray-800">{userInfo?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-lg font-medium text-gray-800">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaPhone className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="text-lg font-medium text-gray-800">{userInfo?.phone || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaUserShield className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Role</p>
                  <p className="text-lg font-medium text-gray-800">{userInfo?.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Created At</p>
                  <p className="text-lg font-medium text-gray-800">
                    {new Date(userInfo?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-[#833d47] text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Updated At</p>
                  <p className="text-lg font-medium text-gray-800">
                    {new Date(userInfo?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
