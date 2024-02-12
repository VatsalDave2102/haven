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
      <div className="mx-auto w-full max-w-sm md:max-w-lg bg-secondary dark:bg-slate-900 rounded-xl p-10 border-r-2 border-b-2 border-pink-400">
        <div className="mb-2 flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="font-bold text-3xl text-primary dark:text-pink-400 tracking-wide ">
            aven
          </h1>
        </div>
        <h2 className="text-center text-xl md:text-2xl font-bold text-primary dark:text-pink-400">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-pink-400 dark:text-secondary">
          Already have an account?&nbsp;
          <Link
            to={"/login"}
            className="font-medium text-primary dark:text-pink-400 transition-all duration-200 hover:underline"
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
            <Button
              type="submit"
              className="w-full text-white"
              bgColor="bg-primary hover:bg-primary/80 dark:hover:primary/70 duration-300"
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
