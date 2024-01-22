"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const signupSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Please enter minimum 3 characters")
    .required("Please enter name"),
  email: Yup.string().email().required("Please enter email address"),
  password: Yup.string()
    .matches(passwordRules, {
      message:
        "Password must have min 8 characters including uppercase letter, lowercase letter, numeric digit",
    })
    .required("Please enter a password"),
  phone: Yup.number()
    .typeError("Please enter correct value")
    .positive("Please enter correct value")
    .integer("Please enter correct value")
    .required("Phone is required"),
});

export default function SignUpForm() {
  const { loginMessage, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      redirect("/");
    } else if (success) {
      setMessage("Successfully registerd, now you can login");
    } else {
      setMessage(loginMessage);
    }
  }, [loginMessage, success]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = (credentials) => {
    dispatch(signup(credentials));
  };

  return (
    <Card className="mx-auto w-full max-w-[24rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <div>
            <label htmlFor="fullname" className="text-gray-600">
              Full Name
            </label>
            <div className="relative max-w-xs mt-2">
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your full name"
                className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("fullname")}
              />
            </div>
            <p>{errors.fullname?.message}</p>
          </div>
          <div>
            <label htmlFor="email" className="text-gray-600">
              Email Address
            </label>
            <div className="relative max-w-xs mt-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("email")}
              />
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="password" className="text-gray-600">
              Password
            </label>
            <div className="relative max-w-xs mt-2">
              <button
                className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              <input
                type={isPasswordHidden ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("password")}
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-600">
              Phone
            </label>
            <div className="relative max-w-xs mt-2">
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your Mobile Number"
                className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                {...register("phone")}
              />
            </div>
            <p>{errors.phone?.message}</p>
          </div>
          {message && <p className="text-blue-600">{message}</p>}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link
              href="/login"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Sign In
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
