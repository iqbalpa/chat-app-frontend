import { jwtDecode } from "jwt-decode";

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

interface DecodedToken {
	user: User;
	iat: number;
	exp: number;
}

export const decodeToken = (accessToken: string) => {
	console.log(`token:\n${accessToken}`);
	const decoded = jwtDecode<DecodedToken>(accessToken);
	console.log(`decoded token:\n${JSON.stringify(decoded)}`);
	return decoded;
};
