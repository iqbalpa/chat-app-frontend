import { Search } from "lucide-react";
import React from "react";

const SearchModule: React.FC = () => {
	return (
		<div className="bg-sky-200 p-10 min-h-screen flex flex-col items-center justify-start">
			<div className="flex flex-row w-full relative">
				<Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
				<input
					placeholder="Search user"
					className="border-2 border-slate-300 active:border-slate-500 py-4 px-12 rounded-full grow"
				/>
			</div>
		</div>
	);
};

export default SearchModule;
