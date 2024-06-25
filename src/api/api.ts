import axios from "axios";
import { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse } from "@/constants/auth.constant";

const BASE_URL: string = "http://localhost:3000";

export const signup = async (data: SignUpRequest) => {
	const res: SignUpResponse = await axios.post(`${BASE_URL}/auth/signup`, {
		name: data.name,
		email: data.email,
		password: data.password,
	});
	console.log(`result:\n${res}`);
	return res;
};

export const signin = async (data: SignInRequest) => {
	const res: SignInResponse = await axios.post(`${BASE_URL}/auth/signin`, {
		email: data.email,
		password: data.password,
	});
	console.log(`result:\n${JSON.stringify(res)}`);
	return res;
};
