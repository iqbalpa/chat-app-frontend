"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/userStore";
import { useRouter } from "next/navigation";

const ProfileModule: React.FC = () => {
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.user);

	useEffect(() => {
		if (!user) {
			router.replace("/signin");
		}
	}, []);

	return (
		<div className="min-h-screen flex justify-center items-start mt-20">
			<div className="flex flex-col gap-4 justify-center items-center h-full w-2/3 border-slate-500 border-[1px] rounded-xl px-5 pb-10 shadow-lg">
				<div className="bg-sky-500 border-slate-500 border-[1px] shadow-2xl rounded-full p-5 min-h-20 min-w-20 flex justify-center items-center -m-10">
					{user?.name.charAt(0).toUpperCase()}
				</div>
				<div className="flex flex-col justify-center items-center mt-10">
					<p className="font-bold text-3xl">{user?.name}</p>
					<p className="text-neutral-700">{user?.email}</p>
				</div>
				<p className="indent-8 text-justify">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit diam ac turpis sagittis
					rutrum. Praesent pulvinar odio vitae rhoncus malesuada. Integer tempus suscipit semper. Etiam eros
					velit, sollicitudin eu dignissim et, interdum nec ex. Morbi non sapien ornare, molestie urna vitae,
					pulvinar velit. Aenean posuere elementum ipsum, a laoreet augue ultrices et. Vivamus et metus
					auctor, mollis eros scelerisque, auctor lacus. Aenean elementum mollis neque, sed ornare purus
					vehicula vitae.
				</p>
			</div>
		</div>
	);
};

export default ProfileModule;
