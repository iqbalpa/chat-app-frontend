import React from "react";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { User, UsersRound, Search, Mail, Settings, Cookie } from "lucide-react";
import Link from "next/link";

interface IMenuItem {
	label: string;
	path: string;
	icon: any;
}

const menuItemsGeneral: IMenuItem[] = [
	{ label: "Profile", path: "/", icon: <User /> },
	{ label: "Search", path: "/search", icon: <Search /> },
	{ label: "Friends", path: "/friends", icon: <UsersRound /> },
	{ label: "Inbox", path: "/inbox", icon: <Mail /> },
];

const menuItemsSettings: IMenuItem[] = [
	{ label: "General Settings", path: "/settings", icon: <Settings /> },
	{ label: "Privacy", path: "/privacy", icon: <Cookie /> },
];

const Menu: React.FC = () => {
	return (
		<div className="grow">
			<Command>
				<CommandList>
					<CommandGroup heading="General">
						{menuItemsGeneral.map((menuItem, index) => (
							<Link key={index} href={menuItem.path}>
								<CommandItem key={index} className="flex gap-2 cursor-pointer">
									{menuItem.icon}
									{menuItem.label}
								</CommandItem>
							</Link>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						{menuItemsSettings.map((menuItem, index) => (
							<Link key={index} href={menuItem.path}>
								<CommandItem key={index} className="flex gap-2 cursor-pointer">
									{menuItem.icon}
									{menuItem.label}
								</CommandItem>
							</Link>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	);
};

export default Menu;
