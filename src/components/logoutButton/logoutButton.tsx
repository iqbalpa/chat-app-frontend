import { logout } from "@/store/userSlice";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutButton: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		toast.success("Logged out");
		setTimeout(() => {
			router.push("/signin");
		}, 3000);
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-red-300 hover:bg-red-200 text-red-500 hover:text-red-700 bg-opacity-50 font-bold flex flex-row justify-center rounded-lg py-2 hover:scale-105 cursor-pointer duration-150 border-2 border-red-300"
		>
			<p className="mr-2">Logout</p>
			<LogOut />
		</button>
	);
};

export default LogoutButton;
