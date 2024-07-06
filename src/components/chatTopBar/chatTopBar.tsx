import { ArrowLeft } from "lucide-react";
import React from "react";

interface IChatTopBar {
	friendName: string | undefined;
}

const ChatTopBar: React.FC<IChatTopBar> = ({ friendName }) => {
	return (
		<div className="fixed w-full bg-white flex flex-row items-center gap-10 px-6 py-4 border-b-2 border-slate-200">
			<div className="rounded-lg p-2 hover:cursor-pointer hover:bg-slate-500/30 duration-100">
				<ArrowLeft />
			</div>
			<p className="font-bold text-2xl">{friendName}</p>
		</div>
	);
};

export default ChatTopBar;
