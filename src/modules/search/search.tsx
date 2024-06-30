"use client";

import API from "@/api/api";
import { Search, UserRoundPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
	id: number;
	name: string;
	email: string;
}

const SearchModule: React.FC = () => {
	const currentUser = useSelector((state: RootState) => state.user.user);
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const MAX_PAGE = 5;

	const handleClickPrev = () => {
		setCurrentPage((prevPage) => {
			if (prevPage === 1) {
				return 1;
			}
			return prevPage - 1;
		});
	};
	const handleClickNext = () => {
		setCurrentPage((prevPage) => {
			if (prevPage === MAX_PAGE) {
				return MAX_PAGE;
			}
			return prevPage + 1;
		});
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await API.getAllUsersPagination(currentPage);
				if (!res) {
					toast.error("Failed to fetch users");
					return;
				}
				console.log(`users:\n${JSON.stringify(res)}`);
				setUsers(res);
			} catch (error) {
				toast.error("An error occurred during fetching users data");
			}
		};
		fetchUsers();	
	}, [currentPage]);

	return (
		<div className="pt-10 pb-5 px-10 min-h-screen flex flex-col items-center justify-start">
			<div className="flex flex-row w-full relative">
				<Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
				<input
					placeholder="Search user"
					className="border-2 border-slate-300 active:border-slate-500 py-4 px-12 rounded-full grow"
				/>
			</div>
			<div className="mt-10 grid grid-cols-3 gap-8 grow">
				{users
					.filter((user) => user.email !== currentUser?.email)
					.map((user) => (
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
			<Pagination className="mt-12">
				<PaginationContent>
					<PaginationItem className="hover:cursor-pointer">
						<PaginationPrevious onClick={handleClickPrev} />
					</PaginationItem>
					{currentPage > 1 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink>{currentPage}</PaginationLink>
					</PaginationItem>
					{currentPage < MAX_PAGE && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem className="hover:cursor-pointer">
						<PaginationNext onClick={handleClickNext} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<ToastContainer />
		</div>
	);
};

export default SearchModule;
