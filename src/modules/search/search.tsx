import { Search, UserRoundPlus } from "lucide-react";
import React from "react";

interface User {
	id: number;
	name: string;
	email: string;
}

const users: User[] = [
	{ id: 1, name: "John Doe", email: "johndoe@example.com" },
	{ id: 2, name: "Jane Smith", email: "janesmith@example.com" },
	{ id: 3, name: "Alice Johnson", email: "alicejohnson@example.com" },
	{ id: 4, name: "Bob Brown", email: "bobbrown@example.com" },
	{ id: 5, name: "Charlie Davis", email: "charliedavis@example.com" },
	{ id: 6, name: "David Wilson", email: "davidwilson@example.com" },
	{ id: 7, name: "Emma Thompson", email: "emmathompson@example.com" },
	{ id: 8, name: "Frank White", email: "frankwhite@example.com" },
	{ id: 9, name: "Grace Lee", email: "gracelee@example.com" },
	{ id: 10, name: "Henry Clark", email: "henryclark@example.com" },
];

const SearchModule: React.FC = () => {
	return (
		<div className="p-10 min-h-screen flex flex-col items-center justify-start">
			<div className="flex flex-row w-full relative">
				<Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
				<input
					placeholder="Search user"
					className="border-2 border-slate-300 active:border-slate-500 py-4 px-12 rounded-full grow"
				/>
			</div>
			<div className="mt-10 grid grid-cols-3 gap-8">
				{users.map((user, index) => (
					<div
						key={user.id}
						className="flex flex-row items-center justify-between bg-slate-100 border-[1px] border-slate-200 shadow-lg py-10 px-7 rounded-xl hover:scale-105 duration-150"
					>
						<div className="flex flex-col">
							<p className="font-semibold">{user.name}</p>
							<p className="text-slate-700 text-sm">{user.email}</p>
						</div>
						<div className="bg-slate-300 bg-opacity-50 ml-4 p-1 rounded-md hover:cursor-pointer">
							<UserRoundPlus />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchModule;
