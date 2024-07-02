import React from "react";
import { User } from "@/constants/user";
import { BookUser, MailPlus } from "lucide-react";

const users: User[] = [
	{ id: 1, name: "Alice Smith", email: "alice.smith@example.com" },
	{ id: 2, name: "Bob Johnson", email: "bob.johnson@example.com" },
	{ id: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
	{ id: 4, name: "Diana Ross", email: "diana.ross@example.com" },
	{ id: 5, name: "Ethan Hunt", email: "ethan.hunt@example.com" },
];

const FriendsModule: React.FC = () => {
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
		</div>
	);
};

export default FriendsModule;
