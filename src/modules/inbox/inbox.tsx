"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { ArrowLeft, SendHorizontal } from "lucide-react";

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
			<div className=" flex flex-row items-center gap-10 px-6 py-4 border-b-2 border-slate-200">
				<div className="rounded-lg p-1 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
					<ArrowLeft />
				</div>
				<p className="font-bold text-2xl">Iqbal</p>
			</div>

			{/* chat space */}
			<div className="grow"></div>

			{/* chat input */}
			<div className="flex flex-row items-center justify-center px-6 py-6 border-t-2 border-slate-200">
				<textarea
					ref={textareaRef}
					value={message}
					onChange={handleChange}
					className="relative w-full px-6 py-3 bg-slate-200 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					style={{ overflow: "hidden" }}
					placeholder="Type your message..."
					rows={1}
				/>
				<div className="absolute right-8 rounded-lg p-1 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
					<SendHorizontal />
				</div>
			</div>
		</div>
	);
};

export default InboxModule;
