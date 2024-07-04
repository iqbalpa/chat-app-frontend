"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";

interface Message {
	name: string;
	text: string;
}

const messages: Message[] = [
	{ name: "Alice", text: "Hey everyone, how are you all doing?" },
	{ name: "Me", text: "I am doing great, Alice! How about you?" },
	{ name: "Alice", text: "I'm doing well, thanks for asking!" },
	{ name: "Charlie", text: "Same here, enjoying the weather!" },
	{ name: "Alice", text: "That's great to hear, Charlie!" },
	{ name: "Me", text: "Anyone up for a game later?" },
	{
		name: "Alice",
		text: "Hmm, that's a good idea. But, I think I cannot join you guys because I have a meeting this evening.",
	},
	{ name: "Me", text: "Ah, that is so unfortunate" },
	{ name: "Charlie", text: "How about tomorrow instead?" },
	{ name: "Alice", text: "It would be great" },
	{ name: "Me", text: "Ok, then see you tomorrow you all" },
	{ name: "Charlie", text: "Sure, looking forward to it!" },
	{ name: "Alice", text: "I'll make sure to be there!" },
	{ name: "Me", text: "Awesome! Let's decide the time then." },
	{ name: "Charlie", text: "How about 6 PM?" },
	{ name: "Alice", text: "6 PM works for me." },
	{ name: "Me", text: "Perfect! See you all at 6 PM tomorrow." },
	{ name: "Charlie", text: "Great, see you all then!" },
	{ name: "Alice", text: "See you tomorrow!" },
];

const InboxModule: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [message]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

	return (
		<div className="bg-white flex flex-col w-full min-h-screen">
			{/* top */}
			<div className="fixed w-full bg-white flex flex-row items-center gap-10 px-6 py-4 border-b-2 border-slate-200">
				<div className="rounded-lg p-2 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
					<ArrowLeft />
				</div>
				<p className="font-bold text-2xl">Iqbal</p>
			</div>

			{/* chat space */}
			<div className="mt-[4.5rem] mb-[6rem]  grow flex flex-col gap-1 p-2">
				{messages.map((message, index) => (
					<div key={index} className={`flex ${message.name === "Me" ? "justify-end" : "justify-start"}`}>
						<div
							className={`flex flex-col px-4 py-2 text-left ${
								message.name === "Me"
									? "bg-slate-300 text-right rounded-tl-lg rounded-bl-lg rounded-tr-lg"
									: "bg-sky-300 rounded-tr-lg rounded-br-lg rounded-tl-lg"
							}`}
						>
							<p className="text-xs font-bold">{message.name}</p>
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
				<div className="absolute rounded-lg right-[21rem] p-1 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
					<SendHorizontal />
				</div>
			</div>
		</div>
	);
};

export default InboxModule;
