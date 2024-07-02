import React from "react";
import { User } from "@/constants/user";
import UserCard from "../userCard/userCard";

interface IUserList {
	users: User[];
	currentUser: User;
	searchVal: string;
	handleAddFriend: (id: number) => void;
}

const UserList: React.FC<IUserList> = ({ users, currentUser, searchVal, handleAddFriend }) => {
	return (
		<div className="mt-10 grid grid-cols-3 gap-8">
			{users
				.filter((user) => user.email !== currentUser?.email)
				.filter((user) => user.name.toLowerCase().includes(searchVal))
				.map((user) => (
					<UserCard user={user} handleAddFriend={handleAddFriend} />
				))}
		</div>
	);
};

export default UserList;
