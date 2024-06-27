import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/sidebar";

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
				<Sidebar />
				<main className="w-full h-full">{children}</main>
			</body>
		</html>
	);
}
