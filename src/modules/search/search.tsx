"use client";

import API from "@/api/api";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";
import { getCookie } from "cookies-next";
import SearchBar from "@/components/searchBar/searchBar";
import UserList from "@/components/userList/userList";
import MyPagination from "@/components/pagination/MyPagination";
import { User } from "@/constants/user";

const SearchModule: React.FC = () => {
	const currentUser = useSelector((state: RootState) => state.user.user);
	const [users, setUsers] = useState<User[]>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);
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
		const fetchAllUsers = async () => {
			try {
				const res = await API.getAllUsers();
				if (!res) {
					toast.error("Failed to fetch users");
					return;
				}
				setAllUsers(res);
				console.log("all users fetched");
			} catch (error) {
				toast.error("An error occurred during fetching users data");
			}
		};
		fetchAllUsers();
	}, [currentPage]);
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await API.getAllUsersPagination((currentPage - 1) * 9);
				if (!res) {
					toast.error("Failed to fetch users");
					return;
				}
				setUsers(res);
				console.log("users pagination fetched");
			} catch (error) {
				toast.error("An error occurred during fetching users data");
			}
		};
		fetchUsers();
	}, [currentPage]);

	return (
		<div className="pt-10 pb-8 px-10 min-h-screen flex flex-col items-center justify-start">
			<SearchBar searchVal={searchVal} handleSearchValChange={handleSearchValChange} />
			<UserList
				users={users}
				allUsers={allUsers}
				currentUser={currentUser}
				searchVal={searchVal}
				handleAddFriend={handleAddFriend}
			/>
			<div className="grow"></div>
			<MyPagination
				currentPage={currentPage}
				maxPage={maxPage}
				handleClickPrev={handleClickPrev}
				handleClickNext={handleClickNext}
			/>
			{/* <ToastContainer /> */}
		</div>
	);
};

export default SearchModule;
