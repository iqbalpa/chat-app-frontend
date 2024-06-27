import React from "react";
import UserItem from "../userItem/userItem";

const Sidebar: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 w-[300px] border-r-2 min-h-screen p-4">
			<UserItem />
			<div>Menu Item 1</div>
			<div>Menu Item 2</div>
			<div className="grow">Menu Item 3</div>
			<div>Settings</div>
		</div>
	);
};

export default Sidebar;
