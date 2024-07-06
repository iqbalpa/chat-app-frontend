"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";
import { useRouter } from "next/navigation";
import API from "@/api/api";
import { User } from "@/constants/user";
import { getCookie } from "cookies-next";
import { MessageRequest, MessageResponse } from "@/constants/message.constant";
import ChatTopBar from "@/components/chatTopBar/chatTopBar";
import ChatSpace from "@/components/chatSpace/chatSpace";
import ChatInput from "@/components/chatInput/chatInput";

let socket: Socket;

const InboxModule: React.FC<{ friendId: string }> = ({ friendId }) => {
	const router = useRouter();
	if (!friendId) {
		router.push("/friends");
	}

	const user = useSelector((state: RootState) => state.user.user);
	const accessToken = getCookie("accessToken") as string;
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [friend, setFriend] = useState<User>();
	const [messages, setMessages] = useState<MessageResponse[]>([]);
	const [message, setMessage] = useState<string>("");

	const roomId: string = `${user?.id}-${friendId}`;
	const friendRoomId: string = `${friendId}-${user?.id}`;

	useEffect(() => {
		const fetchFriend = async () => {
			const res = await API.getUserById(parseInt(friendId), accessToken);
			setFriend(res);
		};
		fetchFriend();
	}, [user, friendId]);

	useEffect(() => {
		if (!socket) {
			socket = io("http://localhost:3000");
		}
		socket.emit("joinRoom", { roomId: roomId });
		socket.emit("findHistoryMessages", { roomId: roomId });
		socket.on("history", (messages: MessageResponse[]) => {
			setMessages(messages);
		});
		socket.on("message", (message: MessageResponse) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});
		return () => {
			socket.off("message");
		};
	}, [roomId]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

	const sendMessage = () => {
		if (user && message.trim() !== "") {
			const newMessage: MessageRequest = { name: user?.name, text: message, roomId: roomId, friendRoomId };
			socket.emit("createMessage", newMessage);
			setMessage("");
		}
	};

	return (
		<div className="bg-white flex flex-col w-full min-h-screen">
			<ChatTopBar friendName={friend?.name} />
			<ChatSpace messages={messages} userName={user?.name} />
			<ChatInput
				textareaRef={textareaRef}
				message={message}
				handleChange={handleChange}
				sendMessage={sendMessage}
			/>
		</div>
	);
};

export default InboxModule;
