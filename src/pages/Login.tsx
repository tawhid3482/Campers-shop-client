/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/features/hook";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { FaUser, FaLock } from "react-icons/fa"; // ✅ Import icons
import CamperForm from "../Components/form/CamperForm";
import FormInput from "../Components/form/FormInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userData = {
        email: data.email, // ✅ Fix incorrect field name
        password: data.password,
      };
      const res = await login(userData).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user)
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Form Section */}
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-sm md:w-1/3">
        <h2 className="text-3xl font-bold text-center text-[#833d47] mb-6">
          Welcome Back 👋
        </h2>

        {/* Using CamperForm for Login */}
        <CamperForm onSubmit={onSubmit}>
          {" "}
          {/* ✅ Fix prop name */}
          {/* Email Field with Icon */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <FormInput
              name="email"
              label=""
              type="email"
              className="pl-10 border-gray-300"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Field with Icon */}
          <div className="relative mt-4">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <FormInput
              name="password"
              label=""
              type="password"
              className="pl-10 border-gray-300"
              placeholder="Enter your password"
            />
          </div>
          {/* Forgot Password & Submit Button */}
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <a href="#" className="hover:text-[#833d47]">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-6 p-3 bg-[#833d47] hover:bg-[#64373e] text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>
        </CamperForm>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-[#833d47] font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
