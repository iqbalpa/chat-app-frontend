import React from "react";
import { UserRoundPlus } from "lucide-react";
import { User } from "@/constants/user";

interface IUserCard {
	user: User;
	handleAddFriend: (id: number) => void;
}

const UserCard: React.FC<IUserCard> = ({ user, handleAddFriend }) => {
	return (
		<div
			key={user.id}
			className="flex flex-row items-center justify-between bg-slate-100 border-[1px] border-slate-200 shadow-lg py-10 px-7 rounded-xl hover:scale-105 duration-150"
		>
			<div className="flex flex-col">
				<p className="font-semibold">{user.name}</p>
				<p className="text-slate-700 text-sm">{user.email}</p>
			</div>
			<button
				onClick={() => handleAddFriend(user.id)}
				className="bg-slate-300 bg-opacity-50 ml-4 p-1 rounded-md hover:cursor-pointer"
			>
				<UserRoundPlus />
			</button>
		</div>
	);
};

export default UserCard;
