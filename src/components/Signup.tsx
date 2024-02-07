import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from ".";
import { useAppDispatch } from "../store/hooks";
import { useForm } from "react-hook-form";
import { AppwriteException } from "appwrite";
import toast from "react-hot-toast";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const create = async (data: SignupFormValues) => {
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          toast.success("Account created successfully!");
        }
        navigate("/");
      }
    } catch (error) {
      const toastError = error as AppwriteException;
      toast.error(toastError.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
              className={errors.name && `ring-2 ring-red-400 ring-inset`}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              className={errors.email && `ring-2 ring-red-400 ring-inset`}
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value: string) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                      value
                    ) || "Email address must be valid",
                },
              })}
            />

            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              className={errors.password && `ring-2 ring-red-400 ring-inset`}
              {...register("password", {
                required: true,
              })}
            />
            {/* {
              errors.password && <p >{errors.password}</p>
            } */}
            <Button
              type="submit"
              className="w-full"
              bgColor="bg-gray-300 hover:bg-gray-500 transition"
            >
              Create account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
