import { FieldValues, useForm } from "react-hook-form"; 
import CamperForm from "../Components/form/CamperForm";
import FormInput from "../Components/form/FormInput";
import { useNavigate } from "react-router";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { toast } from "sonner";

type TUserProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
};

const Register = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TUserProps>();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      };

      const res = await createUser(userInfo).unwrap();
      console.log("User Registered:", res);

      toast.success("Successfully Registered!", { id: toastId, duration: 2000 });
      navigate(`/`);
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error("Something went wrong. Please try again.", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5 w-full">
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full md:max-w-lg">
        <h2 className="text-3xl font-bold text-center text-[#833d47] mb-6">
          Create an Account
        </h2>

        <CamperForm onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your Name"
            className="mb-4"
            rules={{ required: "Name is required" }}
            error={errors?.name?.message}
            control={control}
          />

          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            className="mb-4"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Invalid email address",
              },
            }}
            error={errors.email?.message}
            control={control}
          />

          <FormInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            className="mb-4"
            rules={{ required: "Password is required" }}
            error={errors.password?.message}
            control={control}
          />

          <FormInput
            name="phone"
            label="Phone"
            type="text"
            placeholder="Enter your phone number"
            className="mb-4"
            rules={{ required: "Phone number is required" }}
            error={errors.phone?.message}
            control={control}
          />

          <FormInput
            name="address.street"
            label="Street"
            type="text"
            placeholder="Enter your street address"
            className="mb-4"
            rules={{ required: "Street is required" }}
            error={errors.address?.street?.message}
            control={control}
          />

          <FormInput
            name="address.city"
            label="City"
            type="text"
            placeholder="Enter your city"
            className="mb-4"
            rules={{ required: "City is required" }}
            error={errors.address?.city?.message}
            control={control}
          />

          <FormInput
            name="address.zip"
            label="Zip"
            type="number"
            placeholder="Enter your zip code"
            className="mb-4"
            rules={{ required: "Zip code is required" }}
            error={errors.address?.zip?.message}
            control={control}
          />

          <button
            type="submit"
            className="w-full p-3 bg-[#833d47] hover:bg-[#64373e] text-white font-semibold rounded-lg transition duration-300"
          >
            Register
          </button>
        </CamperForm>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#833d47] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
