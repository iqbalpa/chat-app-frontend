"use client";

import React from "react";
import UserItem from "../userItem/userItem";
import Menu from "../menu/menu";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const antiSidebar: string[] = ["/signin", "signup"];

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useDispatch();
	const isSidebarDisabled = antiSidebar.includes(pathname);

	const handleLogout = () => {
		dispatch(logout());
		toast.success("Logged out");
		setTimeout(() => {
			router.push("/signin");
		}, 3000);
	};

	if (isSidebarDisabled) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 w-[300px] border-r-2 min-h-screen p-4">
			<UserItem />
			<Menu />
			<button
				onClick={handleLogout}
				className="bg-red-300 hover:bg-red-200 text-red-500 hover:text-red-700 bg-opacity-50 font-bold flex flex-row justify-center rounded-lg py-2 hover:scale-105 cursor-pointer duration-150 border-2 border-red-300"
			>
				<p className="mr-2">Logout</p>
				<LogOut />
			</button>
			<ToastContainer />
		</div>
	);
};

export default Sidebar;
