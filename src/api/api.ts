import axios from "axios";
import { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse } from "@/constants/auth.constant";
import { decodeToken } from "@/utils/jwt-decode";

const BASE_URL: string = "http://localhost:3000";

export const signup = async (data: SignUpRequest) => {
	let res = await axios.post(`${BASE_URL}/auth/signup`, {
		name: data.name,
		email: data.email,
		password: data.password,
	});
	res = res.data;
	// console.log(`registered data:\n${JSON.stringify(res)}`);
	return res;
};

export const signin = async (data: SignInRequest) => {
	const res = await axios.post(`${BASE_URL}/auth/signin`, {
		email: data.email,
		password: data.password,
	});
	const result = res.data;
	console.log(`logged in data:\n${JSON.stringify(result)}`);

	// const user = decodeToken(result.access_token).user;
	// console.log(`user:\n${JSON.stringify(user)}`);
	// localStorage.setItem("user", JSON.stringify(user));
	return result;
};
