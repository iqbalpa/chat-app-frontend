"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SignUpInputs = {
	name: string;
	email: string;
	password: string;
};

const SignUpModule: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpInputs>();
	const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data);

	console.log(watch("email"));

	return (
		<div className="bg-forest h-screen flex justify-center items-center">
			<div className="w-1/3 bg-white backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-200 flex flex-col justify-center items-center p-14">
				<h1 className="text-xl font-bold uppercase mb-5">Sign Up</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
					<div className="flex flex-col mb-2">
						<p className="font-semibold mb-1">Name</p>
						<input
							placeholder="name"
							{...register("name", { required: true })}
							className="border-slate-400 border-[1px] rounded-md px-4 py-2"
						/>
						{errors.name && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-2">
						<p className="font-semibold mb-1">Email</p>
						<input
							placeholder="email"
							{...register("email", { required: true })}
							className="border-slate-400 border-[1px] rounded-md px-4 py-2"
						/>
						{errors.email && <span className="text-red-500 text-sm">This field is required</span>}
					</div>
					<div className="flex flex-col mb-4">
						<p className="font-semibold mb-1">Passwrod</p>
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
			</div>
		</div>
	);
};

export default SignUpModule;
