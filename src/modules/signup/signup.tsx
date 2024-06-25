"use client";

import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type SignUpInputs = {
	name: string;
	email: string;
	password: string;
};

const SignUpModule: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpInputs>();
	const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
		try {
			const res = await signup(data);
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
						<input
							placeholder="name"
							{...register("name", { required: true })}
							className="border-slate-400 border-[1px] rounded-md px-4 py-2"
						/>
						{errors.name && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-2">
						<p className="text-white font-semibold mb-1">Email</p>
						<input
							placeholder="email"
							{...register("email", { required: true })}
							className="border-slate-400 border-[1px] rounded-md px-4 py-2"
						/>
						{errors.email && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-4">
						<p className="text-white font-semibold mb-1">Passwrod</p>
						<input
							placeholder="password"
							{...register("password", { required: true })}
							className="border-slate-400 border-[1px] rounded-md px-4 py-2"
						/>
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
