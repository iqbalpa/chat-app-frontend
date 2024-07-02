"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import API from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, User } from "lucide-react";

type SignUpInputs = {
	name: string;
	email: string;
	password: string;
};

const SignUpModule: React.FC = () => {
	const router = useRouter();

	const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
	const togglePassVisibility = () => {
		setIsPassVisible(!isPassVisible);
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpInputs>();
	const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
		try {
			const res = await API.signup(data);
			if (!res) {
				toast.error("Registration failed");
				return;
			}
			toast.success("Registration success");
			setTimeout(() => {
				router.push("/signin");
			}, 5000);
		} catch (error) {
			toast.error("An error occurred during registration");
		}
	};

	return (
		<div className="bg-mountain bg-cover bg-no-repeat h-screen flex justify-center items-center">
			<div className="w-1/3 bg-white backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-200 flex flex-col justify-center items-center p-14">
				<h1 className="text-white text-xl font-bold uppercase mb-5">Sign Up</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
					<div className="flex flex-col mb-2">
						<p className="text-white font-semibold mb-1">Name</p>
						<div className="flex flex-row items-center">
							<input
								placeholder="name"
								{...register("name", { required: true })}
								className="border-slate-400 border-[1px] rounded-md px-4 py-2 mr-2 grow"
							/>
							<User color="#ffffff" size={35} />
						</div>
						{errors.name && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-2">
						<p className="text-white font-semibold mb-1">Email</p>
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
						<p className="text-white font-semibold mb-1">Password</p>
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
					already have an account?{" "}
					<Link href="/signin" className="text-green-500 hover:text-green-700">
						login
					</Link>
				</p>
			</div>
			<ToastContainer />
		</div>
	);
};

export default SignUpModule;
