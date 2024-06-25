import axios from "axios";
import { SignUpRequest, SignUpResponse } from "@/constants/auth.constant";

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
