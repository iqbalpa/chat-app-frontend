"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/constants/user";
import { BookUser, MailPlus } from "lucide-react";
import API from "@/api/api";
import { getCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";

const FriendsModule: React.FC = () => {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.user);
	const [users, setUsers] = useState<User[]>([]);
	const accessToken = getCookie("accessToken") as string;

	useEffect(() => {
		if (!user) {
			router.replace("/signin");
		}
	}, []);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const res = await API.getFriend(accessToken);
				if (!res) {
					toast.error("Failed to fetch friends");
					return;
				}
				setUsers(res);
			} catch (error) {
				toast.error("An error occurred during fetching friends");
			}
		};
		fetchFriends();
	});

	return (
		<div className="flex flex-col items-center min-h-screen w-full p-10">
			<div className="flex flex-row gap-2 items-center">
				<h1 className="font-bold text-2xl">Your Friends</h1>
				<BookUser />
			</div>
			<div className="mt-8 grid grid-cols-4 gap-5">
				{users.map((user, index) => (
					<div
						key={user.id}
						className="flex flex-row justify-between items-center bg-slate-200 px-6 py-4 rounded-lg hover:cursor-pointer hover:scale-105 duration-200 drop-shadow-lg"
					>
						<p>{user.name}</p>
						<div className="w-3"></div>
						<div className="bg-slate-300 p-2 rounded-full">
							<MailPlus />
						</div>
					</div>
				))}
			</div>
			<ToastContainer />
		</div>
	);
};

export default FriendsModule;
