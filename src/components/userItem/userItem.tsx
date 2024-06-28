import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";

const UserItem: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.user);

	return (
		<div className="flex flex-row items-center gap-2 border rounded-lg p-4">
			<div className="bg-sky-500 rounded-full min-h-12 min-w-12 flex justify-center items-center">
				<p>{user?.name.charAt(0).toUpperCase()}</p>
			</div>
			<div className="text-sm">
				<p className="font-bold text-[16px]">{user?.name}</p>
				<p className="text-neutral-500 text-[12px]">{user?.email}</p>
			</div>
		</div>
	);
};

export default UserItem;
