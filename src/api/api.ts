import axios from "axios";
import { SignUpRequest, SignInRequest } from "@/constants/auth.constant";

const BASE_URL: string = "http://localhost:3000";

const signup = async (data: SignUpRequest) => {
	let res = await axios.post(`${BASE_URL}/auth/signup`, {
		name: data.name,
		email: data.email,
		password: data.password,
	});
	res = res.data;
	return res;
};

const signin = async (data: SignInRequest) => {
	const res = await axios.post(`${BASE_URL}/auth/signin`, {
		email: data.email,
		password: data.password,
	});
	const result = res.data;
	return result;
};

const getAllUsers = async () => {
	const res = await axios.get(`${BASE_URL}/users/`);
	const result = res.data;
	return result;
};

const getAllUsersPagination = async (currentPage: number) => {
	const res = await axios.get(`${BASE_URL}/users?skip=${currentPage}`);
	const result = res.data;
	return result;
};

const getUserById = async (id: number, accessToken: string) => {
	const res = await axios.get(`${BASE_URL}/users/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
	const result = res.data;
	return result;
};

const getUserCount = async (): Promise<number> => {
	const count = await axios.get(`${BASE_URL}/users/count`);
	return count.data;
};

const addFriend = async (id: number, accessToken: string) => {
	const res = await axios.post(
		`${BASE_URL}/friends`,
		{
			friendId: id,
		},
		{ headers: { Authorization: `Bearer ${accessToken}` } }
	);
	return res;
};

const getFriend = async (accessToken: string) => {
	const res = await axios.get(`${BASE_URL}/friends`, { headers: { Authorization: `Bearer ${accessToken}` } });
	return res.data;
};

export default {
	signup,
	signin,
	getAllUsers,
	getAllUsersPagination,
	getUserById,
	getUserCount,
	addFriend,
	getFriend,
};
