"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRightIcon,
  Filter,
  MoreHorizontal,
  Trello,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";

interface Props {
  boardTitle?: string;
  onEditBoard?: () => void;
  onFilterClick?: () => void;
  filterCount?: number;
}

const Navbar = ({
  boardTitle,
  onEditBoard,
  filterCount = 0,
  onFilterClick,
}: Props) => {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";
  const isBoardPage = pathname.startsWith("/boards/");

  if (isDashboard) {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trello className="size-6 sm:size-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              Trello
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <UserButton />
          </div>
        </div>
      </header>
    );
  }

  if (isBoardPage) {
    return (
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <Link
                href={"/dashboard"}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 flex-shrink-0"
              >
                <ArrowLeft className="size-4 sm:size-5" />{" "}
                <span className="hidden sm:inline">
                  Back to Dashboard
                </span>{" "}
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="h-4 sm:h-6 w-px bg-gray-300 hidden sm:block" />
              <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                <Trello className="text-blue-600" />
                <div className="text-lg items-center space-x-1 sm:space-x-2 min-w-0">
                  <span className="text-lg font-bold text-gray-900 truncate">
                    {boardTitle}
                  </span>
                </div>
                {onEditBoard && (
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="size-7 p-0 flex-shrink-0"
                    onClick={onEditBoard}
                  >
                    <MoreHorizontal />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {onFilterClick && (
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className={`text-xs sm:text-sm ${
                    filterCount > 0
                      ? "bg-blue-100 border-blue-200"
                      : ""
                  }`}
                  onClick={onFilterClick}
                >
                  <Filter className="size-3 sm:size-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                  {filterCount > 0 && (
                    <Badge
                      className="text-xs ml-1 sm:ml-2 bg-blue-100 border-blue-200"
                      variant={"secondary"}
                    >
                      {filterCount}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trello className="size-6 sm:size-8 text-blue-600" />
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            Trello
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {isSignedIn ? (
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 space-x-4">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Welcome ,{" "}
                {user.firstName ??
                  user.emailAddresses[0].emailAddress}
              </span>
              <Link href={"/dashboard"}>
                <Button size={"sm"} className="text-xs sm:text-sm">
                  Go to Dashboard <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <SignInButton>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-xs sm:text-sm"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size={"sm"} className="text-xs sm:text-sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
