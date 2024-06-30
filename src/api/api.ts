import axios from "axios";
import { SignUpRequest, SignInRequest } from "@/constants/auth.constant";

const BASE_URL: string = "http://localhost:3000";

export const signup = async (data: SignUpRequest) => {
	let res = await axios.post(`${BASE_URL}/auth/signup`, {
		name: data.name,
		email: data.email,
		password: data.password,
	});
	res = res.data;
	return res;
};

export const signin = async (data: SignInRequest) => {
	const res = await axios.post(`${BASE_URL}/auth/signin`, {
		email: data.email,
		password: data.password,
	});
	const result = res.data;
	return result;
};
