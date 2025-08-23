"use client";


import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export default function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu.Root>
     <DropdownMenu.Trigger className="focus:outline-none">
  <Avatar className="w-10 h-10 cursor-pointer">
    <AvatarImage className="w-full h-full object-cover rounded-full" src={user.photoURL || "/default-avatar.png"} alt={user.name} />
    <AvatarFallback className="flex items-center justify-center bg-gray-400 text-white rounded-full">
      {user.name?.[0]}
    </AvatarFallback>
  </Avatar>
</DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 min-w-[150px]">
        <DropdownMenu.Label className="px-4 py-1 text-gray-500 dark:text-gray-400 text-sm">
          {user.name}
        </DropdownMenu.Label>

        <DropdownMenu.Item className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer">
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer"
          onClick={logout}
        >
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
