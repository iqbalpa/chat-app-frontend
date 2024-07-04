import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";
import UserProvider from "@/provider/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Real Time Chat App",
	description: "Real Time Chat App with NextJS, NestJS, and Websockets",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} flex items-start justify-between`}>
				<UserProvider>
					<Sidebar />
					<main className="ml-[300px] w-full h-full">{children}</main>
				</UserProvider>
			</body>
		</html>
	);
}
