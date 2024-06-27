"use client";

import React from "react";
import UserItem from "../userItem/userItem";
import Menu from "../menu/menu";
import { usePathname } from "next/navigation";

const antiSidebar: string[] = ["/signin", "signup"];

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const isSidebarDisabled = antiSidebar.includes(pathname);

	if (isSidebarDisabled) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4 w-[300px] border-r-2 min-h-screen p-4">
			<UserItem />
			<Menu />
		</div>
	);
};

export default Sidebar;
