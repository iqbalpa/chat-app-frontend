import React from "react";
import UserItem from "../userItem/userItem";
import Menu from "../menu/menu";

const Sidebar: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 w-[300px] border-r-2 min-h-screen p-4">
			<UserItem />
			<Menu />
		</div>
	);
};

export default Sidebar;
