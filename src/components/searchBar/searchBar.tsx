import { Search } from "lucide-react";
import React, { ChangeEvent } from "react";

interface ISearchBar {
	searchVal: string;
	handleSearchValChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ searchVal, handleSearchValChange }) => {
	return (
		<div className="flex flex-row w-full relative">
			<Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
			<input
				placeholder="Search user"
				className="border-2 border-slate-300 active:border-slate-500 py-4 px-12 rounded-full grow"
				value={searchVal}
				onChange={handleSearchValChange}
			/>
		</div>
	);
};

export default SearchBar;
