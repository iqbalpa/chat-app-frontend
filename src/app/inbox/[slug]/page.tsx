"use client";

import InboxModule from "@/modules/inbox/inbox";
import { usePathname } from "next/navigation";

export default function Page() {
	const pathname = usePathname();
	const friendId = pathname.split("/")[2];
	return <InboxModule friendId={friendId} />;
}
