"use client";

import React from "react";
import UserItem from "../userItem/userItem";
import Menu from "../menu/menu";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutButton from "../logoutButton/logoutButton";

const antiSidebar: string[] = ["/signin", "/signup"];

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const isSidebarDisabled = antiSidebar.includes(pathname);

	if (isSidebarDisabled) {
		return null;
	}

	return (
		<div className="fixed flex flex-col gap-4 w-[300px] border-r-2 min-h-screen p-4">
			<UserItem />
			<Menu />
			<LogoutButton />
			<ToastContainer />
		</div>
	);
};

export default Sidebar;
