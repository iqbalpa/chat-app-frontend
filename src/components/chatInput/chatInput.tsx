import React, { ChangeEvent } from "react";
import { SendHorizontal } from "lucide-react";

interface IChatInput {
	textareaRef: any;
	message: string;
	handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	sendMessage: () => void;
}

const ChatInput: React.FC<IChatInput> = ({ textareaRef, message, handleChange, sendMessage }) => {
	return (
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
	);
};

export default ChatInput;
