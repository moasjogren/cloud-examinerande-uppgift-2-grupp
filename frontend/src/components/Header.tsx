"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useLoginStore } from "../app/zustand/loginContext";

export default function Header() {
  const router = useRouter();
  const { logout } = useLoginStore();

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      logout();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="header-component">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
        <h1 className="header-title text-xl md:text-2xl font-serif">Journal</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="header-signout-btn cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
