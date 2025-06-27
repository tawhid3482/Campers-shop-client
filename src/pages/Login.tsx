/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/features/hook";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // Controlled input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    const toastId = toast.loading("Logging in...");

    try {
      const res = await login({ email, password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  // Demo credentials
  const demoUser = { email: "user@gmail.com", password: "123456" };
  const demoAdmin = { email: "admin@gmail.com", password: "123456" };

  const fillDemoCredentials = (creds: typeof demoUser) => {
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md md:w-1/3">
        <h2 className="text-3xl font-bold text-center text-[#833d47] mb-6">
          Welcome Back 👋
        </h2>

        {/* Demo Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => fillDemoCredentials(demoUser)}
            className="px-4 py-2 bg-[#6c8e1e] text-white rounded-lg hover:bg-[#557412] transition"
          >
            Fill Demo User
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials(demoAdmin)}
            className="px-4 py-2 bg-[#833d47] text-white rounded-lg hover:bg-[#6c3141] transition"
          >
            Fill Demo Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} noValidate>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 border border-gray-300 rounded-md w-full py-3 focus:outline-none focus:ring-2 focus:ring-[#833d47]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative mt-4">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Enter your password"
              className="pl-10 border border-gray-300 rounded-md w-full py-3 focus:outline-none focus:ring-2 focus:ring-[#833d47]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

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
        </form>

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
