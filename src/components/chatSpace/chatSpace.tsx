import { MessageResponse } from "@/constants/message.constant";
import React from "react";

interface IChatSpace {
	messages: MessageResponse[];
	userName: string | undefined;
}

const ChatSpace: React.FC<IChatSpace> = ({ messages, userName }) => {
	return (
		<div className="mt-[4.5rem] mb-[6rem]  grow flex flex-col gap-1 p-2">
			{messages.map((message, index) => (
				<div key={index} className={`flex ${message.name === userName ? "justify-end" : "justify-start"}`}>
					<div
						className={`flex flex-col px-4 py-2 text-left ${
							message.name === userName
								? "bg-slate-300 text-right rounded-tl-lg rounded-bl-lg rounded-tr-lg"
								: "bg-sky-300 rounded-tr-lg rounded-br-lg rounded-tl-lg"
						}`}
					>
						<p className="text-xs font-bold">{message.name === userName ? "Me" : message.name}</p>
						<p>{message.text}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatSpace;
