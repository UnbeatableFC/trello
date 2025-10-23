"use client";

import Navbar from "@/components/general/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBoards } from "@/lib/hooks/useBoards";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  ChartBar,
  ChartBarBig,
  Filter,
  Grid3X3,
  List,
  Loader2,
  Plus,
  Rocket,
  Search,
  Trello,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Dashboard = () => {
  const { user } = useUser();

  const { createBoard, boards, loading, error } = useBoards();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCreateBoard = async () => {
    await createBoard({ title: "New Board" });
  };

  if (loading) {
    <div>
      <Loader2 /> <span>Loading your boards..</span>
    </div>;
  }

  if (error) {
    <div>
      <h2>Error Loading Boards</h2>
      <p>{error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}!
            🙌
          </h1>
          <p className="text-gray-600">
            Here&apos;s what happening with your boards today
          </p>
          <Button
            className="w-full sm:w-auto"
            onClick={handleCreateBoard}
          >
            <Plus className="size-4 mr-2" />
            Create Board
          </Button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Boards
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="size-10 sm:size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Trello className="size-5 sm:size-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Active Projects
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="size-10 sm:size-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Rocket className="size-5 sm:size-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Recent Activity
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {
                      boards.filter((board) => {
                        const updatedAt = new Date(board.updated_at);
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return updatedAt > oneWeekAgo;
                      }).length
                    }
                  </p>
                </div>
                <div className="size-10 sm:size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ChartBarBig className="size-5 sm:size-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    Total Boards
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {boards.length}
                  </p>
                </div>
                <div className="size-10 sm:size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Trello className="size-5 sm:size-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Boards */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Your Boards
              </h2>
              <p className="text-gray-600">
                Manage your projects and tasks
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 bg-white border p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size={"sm"}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size={"sm"}
                  onClick={() => setViewMode("list")}
                >
                  <List />
                </Button>
              </div>
              <Button variant={"outline"} size={"sm"}>
                <Filter /> <span>Filter</span>
              </Button>

              <Button onClick={handleCreateBoard}>
                <Plus />
                Create Board
              </Button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search Boards..."
              className="pl-10"
            />
          </div>

          {/* Boards Grid Or List */}
          {boards.length === 0 ? (
            <div>No Boards Yet</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {boards.map((board) => (
                <Link key={board.id} href={`/boards/${board.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`size-4 ${board.color} rounded-full`}
                        />
                        <Badge
                          variant={"secondary"}
                          className="text-xs"
                        >
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {board.title}
                      </CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {board.description}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                        <span>
                          Created{" "}
                          {new Date(
                            board.created_at
                          ).toLocaleDateString()}
                        </span>
                        <span>
                          Updated{" "}
                          {new Date(
                            board.updated_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors group cursor-pointer">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <Plus className="size-6 sm:size-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create New Board
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {boards.map((board , key) => (
                <div key={key} className={key > 0 ? "mt-4" : ""}>
                <Link  href={`/boards/${board.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`size-4 ${board.color} rounded-full`}
                        />
                        <Badge
                          variant={"secondary"}
                          className="text-xs"
                        >
                          New
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                      <CardTitle className="text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {board.title}
                      </CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {board.description}
                      </CardDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                        <span>
                          Created{" "}
                          {new Date(
                            board.created_at
                          ).toLocaleDateString()}
                        </span>
                        <span>
                          Updated{" "}
                          {new Date(
                            board.updated_at
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                </div>
              ))}
              <Card className="mt-4 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors group cursor-pointer">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <Plus className="size-6 sm:size-8 text-gray-400 group-hover:text-blue-600 mb-2" />
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">
                    Create New Board
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
