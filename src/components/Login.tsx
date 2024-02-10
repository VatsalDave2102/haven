import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { AppwriteException } from "appwrite";
import toast from "react-hot-toast";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const login = async (data: LoginFormValues) => {
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          toast.success("Successfully logged in!");
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
      <div className="mx-auto w-full max-w-sm md:max-w-lg bg-secondary rounded-xl p-10 border-r-2 border-b-2 border-pink-400">
        <div className="mb-2 flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="font-bold text-3xl text-primary tracking-wide ">
            aven
          </h1>
        </div>
        <h2 className="text-center text-xl md:text-2xl font-bold text-primary">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-pink-400">
          Don&apos;t have any account?&nbsp;
          <Link
            to={"/signup"}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className={errors.email && `ring-2 ring-red-400 ring-inset`}
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
              bgColor="bg-primary hover:bg-primary/80 duration-300"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
