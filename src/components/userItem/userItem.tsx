import React from "react";

const UserItem: React.FC = () => {
	return (
		<div className="flex flex-row items-center gap-2 border rounded-lg p-4">
			<div className="bg-sky-500 rounded-full min-h-12 min-w-12 flex justify-center items-center">
				<p>IP</p>
			</div>
			<div className="text-sm">
				<p className="font-bold text-[16px]">Iqbal Pahlevi</p>
				<p className="text-neutral-500 text-[12px]">iqbalpahlevi@gmail.com</p>
			</div>
		</div>
	);
};

export default UserItem;
