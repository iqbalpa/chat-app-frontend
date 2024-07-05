"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";
import { useRouter } from "next/navigation";
import API from "@/api/api";
import { User } from "@/constants/user";
import { getCookie } from "cookies-next";

interface Message {
	name: string;
	text: string;
}

const InboxModule: React.FC<{ friendId: string }> = ({ friendId }) => {
	const router = useRouter();
	if (!friendId) {
		router.push("/friends");
	}
	const socket = io("http://localhost:3000");
	const user = useSelector((state: RootState) => state.user.user);
	const [friend, setFriend] = useState<User>();
	const accessToken = getCookie("accessToken") as string;

	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState<string>("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await API.getUserById(parseInt(friendId), accessToken);
			setFriend(res);
		};
		fetchUser();
	}, []);

	useEffect(() => {
		socket.on("message", (message: Message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
		return () => {
			socket.off("message");
		};
	}, []);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

	const sendMessage = () => {
		if (user && message.trim() !== "") {
			const newMessage: Message = { name: user?.name, text: message };
			socket.emit("createMessage", newMessage);
			setMessage("");
		}
	};

	return (
		<div className="bg-white flex flex-col w-full min-h-screen">
			{/* top */}
			<div className="fixed w-full bg-white flex flex-row items-center gap-10 px-6 py-4 border-b-2 border-slate-200">
				<div className="rounded-lg p-2 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
					<ArrowLeft />
				</div>
				<p className="font-bold text-2xl">{friend?.name}</p>
			</div>

			{/* chat space */}
			<div className="mt-[4.5rem] mb-[6rem]  grow flex flex-col gap-1 p-2">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex ${message.name === user?.name ? "justify-end" : "justify-start"}`}
					>
						<div
							className={`flex flex-col px-4 py-2 text-left ${
								message.name === user?.name
									? "bg-slate-300 text-right rounded-tl-lg rounded-bl-lg rounded-tr-lg"
									: "bg-sky-300 rounded-tr-lg rounded-br-lg rounded-tl-lg"
							}`}
						>
							<p className="text-xs font-bold">{message.name === user?.name ? "Me" : message.name}</p>
							<p>{message.text}</p>
						</div>
					</div>
				))}
			</div>

			{/* chat input */}
			<div className="fixed bottom-0 w-full pr-[20rem] bg-white flex flex-row items-center justify-center px-6 py-6 border-t-2 border-slate-200">
				<textarea
					ref={textareaRef}
					value={message}
					onChange={handleChange}
					className="relative w-full px-6 py-3 bg-slate-200 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					style={{ overflow: "hidden" }}
					placeholder="Type your message..."
					rows={1}
				/>
				<div
					onClick={sendMessage}
					className="absolute rounded-lg right-[21rem] p-1 hover:cursor-pointer hover:bg-slate-500/30 duration-100"
				>
					<SendHorizontal />
				</div>
			</div>
		</div>
	);
};

export default InboxModule;
