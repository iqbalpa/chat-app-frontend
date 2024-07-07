"use client";

import API from "@/api/api";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";
import { decodeToken } from "@/utils/jwt-decode";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Eye, EyeOff, Mail } from "lucide-react";

type SignInInputs = {
	email: string;
	password: string;
};

const SignInModule: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignInInputs>();

	const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
	const togglePassVisibility = () => {
		setIsPassVisible(!isPassVisible);
	};

	const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
		try {
			const res = await API.signin(data);
			if (!res) {
				toast.error("Login failed");
				return;
			}
			setCookie("accessToken", res.access_token); // store access token in cookie. use getCookie('accessToken')

			console.log("decoding token...");
			const user = decodeToken(res.access_token).user;
			console.log(user);
			dispatch(setUser(user));
			toast.success("Login success");
			setTimeout(() => {
				router.push("/");
			}, 1500);
		} catch (error) {
			toast.error("An error occurred during logging in");
		}
	};

	return (
		<div className="-ml-[300px] bg-mountain bg-cover bg-no-repeat h-screen flex justify-center items-center">
			<div className="w-1/3 bg-white backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200 flex flex-col justify-center items-center p-14">
				<h1 className="text-white text-xl font-bold uppercase mb-5">Sign In</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
					<div className="flex flex-col mb-2">
						<p className="font-semibold mb-1 text-white">Email</p>
						<div className="flex flex-row items-center">
							<input
								placeholder="email"
								{...register("email", { required: true })}
								className="border-slate-400 border-[1px] rounded-md px-4 py-2 mr-2 grow"
							/>
							<Mail color="#ffffff" size={35} />
						</div>
						{errors.email && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-4">
						<p className="font-semibold mb-1 text-white">Password</p>
						<div className="flex flex-row items-center">
							<input
								placeholder="password"
								type={isPassVisible ? "text" : "password"}
								{...register("password", { required: true })}
								className="border-slate-400 border-[1px] rounded-md px-4 py-2 mr-2 grow"
							/>
							{isPassVisible ? (
								<Eye
									color="#ffffff"
									size={35}
									onClick={togglePassVisibility}
									className="cursor-pointer"
								/>
							) : (
								<EyeOff
									color="#ffffff"
									size={35}
									onClick={togglePassVisibility}
									className="cursor-pointer"
								/>
							)}
						</div>
						{errors.password && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<input
						type="submit"
						className="bg-emerald-500 px-4 py-2 rounded-lg text-white hover:bg-emerald-700 hover:cursor-pointer duration-100"
					/>
				</form>
				<p className="text-white text-sm mt-5">
					doesn't have an account?{" "}
					<Link href="/signup" className="text-green-500 hover:text-green-700">
						register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignInModule;
