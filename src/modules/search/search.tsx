"use client";

import API from "@/api/api";
import { Search, UserRoundPlus } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { getCookie } from "cookies-next";
import SearchBar from "@/components/searchBar/searchBar";
import UserCard from "@/components/userCard/userCard";

interface User {
	id: number;
	name: string;
	email: string;
}

// TODO: use different icon for added friend

const SearchModule: React.FC = () => {
	const currentUser = useSelector((state: RootState) => state.user.user);
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>();
	const [searchVal, setSearchVal] = useState<string>("");
	const accessToken = getCookie("accessToken") as string;

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
			if (prevPage === maxPage) {
				return maxPage;
			}
			return prevPage + 1;
		});
	};
	const handleAddFriend = async (id: number) => {
		try {
			const res = await API.addFriend(id, accessToken);
			if (!res) {
				toast.error("failed to add friend");
				return null;
			}
			toast.success("added to friend list");
		} catch (error) {
			console.log(error);
		}
	};
	const handleSearchValChange = (e: ChangeEvent<HTMLInputElement>) => setSearchVal(e.target.value);

	useEffect(() => {
		const fetchUserCount = async () => {
			try {
				const count = await API.getUserCount();
				setMaxPage(Math.ceil(count / 9));
			} catch (error) {
				console.log("failed to get user count");
			}
		};
		fetchUserCount();
	}, []);
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
		<div className="pt-10 pb-8 px-10 min-h-screen flex flex-col items-center justify-start">
			<SearchBar searchVal={searchVal} handleSearchValChange={handleSearchValChange} />
			<div className="mt-10 grid grid-cols-3 gap-8">
				{users
					.filter((user) => user.email !== currentUser?.email)
					.filter((user) => user.name.toLowerCase().includes(searchVal))
					.map((user) => (
						<UserCard user={user} handleAddFriend={handleAddFriend} />
					))}
			</div>
			<div className="grow"></div>
			<Pagination>
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
					{maxPage && currentPage < maxPage && (
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
