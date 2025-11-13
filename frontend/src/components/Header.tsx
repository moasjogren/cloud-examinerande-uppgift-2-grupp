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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
        <h1 className="header-title text-lg sm:text-xl md:text-2xl font-serif">Journal</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="header-signout-btn cursor-pointer text-xs sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
