"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Plus } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isNgoPage = pathname === "/ngo";

  return (
    <div className="border-b flex items-center justify-between px-4">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-lg font-semibold">NGO Impact Dashboard</h1>
      </div>
      {!isNgoPage && (
        <Button onClick={() => router.push("/ngo")}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add New NGO</span>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
