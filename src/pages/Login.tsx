import { FieldValues } from "react-hook-form";
import CamperForm from "../Components/form/CamperForm";
import FormInput from "../Components/form/FormInput";
import { FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Form Section */}
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-sm md:w-1/3">
        <h2 className="text-3xl font-bold text-center text-[#833d47] mb-6">
          Welcome Back 👋
        </h2>

        {/* Using CamperForm for Login */}
        <CamperForm onsubmit={onSubmit}>
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
          <a href="/sign-up" className="text-[#833d47] font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
