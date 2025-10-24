"use client";

import Navbar from "@/components/general/navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSingleBoard } from "@/lib/hooks/useBoards";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const { board, updateBoard } = useSingleBoard(id);
  const [isEditingTitle, setIsEditingTitle] =
    useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newColor, setNewColor] = useState("");

  const handleUpdateBoard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !board) return;

    try {
      await updateBoard(board.id, {
        title: newTitle.trim(),
        color: newColor || board.color,
      });
      setIsEditingTitle(false);
    } catch (error) {}
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        boardTitle={board?.title}
        onEditBoard={() => {
          setNewTitle(board?.title ?? "");
          setNewColor(board?.color ?? "");
          setIsEditingTitle(true);
        }}
        onFilterClick={() => setIsFilterOpen(true)}
        filterCount={2}
      />

      <Dialog open={isEditingTitle} onOpenChange={setIsEditingTitle}>
        <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleUpdateBoard}>
            <div className="space-y-2">
              <Label htmlFor="boardTitle">Board Title</Label>
              <Input
                id="boardTitle"
                placeholder="Enter Board Title..."
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Board Color</Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-red-500",
                  "bg-yellow-500",
                  "bg-cyan-500",
                  "bg-emerald-500",
                  "bg-gray-500",
                  "bg-pink-500",
                  "bg-purple-500",
                  "bg-indigo-500",
                  "bg-teal-500",
                  "bg-orange-500",
                ].map((color) => (
                  <button
                    type="button"
                    className={`size-8 rounded-full cursor-pointer ${color} ${
                      color === newColor
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : ""
                    }`}
                    key={color}
                    onClick={() => setNewColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsEditingTitle(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="w-[95vw] max-w-[425px] mx-auto">
          <DialogHeader>
            <DialogTitle>Filter Tasks</DialogTitle>
            <p className="text-xs text-gray-600">
              Filter Tasks by priority, assignee or due date
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex flex-wrap gap-2">
                {["low", "medium", "high"].map((p, idx) => (
                  <Button key={idx} variant={"outline"} size={"sm"}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            {/* <div className="space-y-2">
                <Label>Assignee</Label>
                <div className="flex flex-wrap gap-2">
                    {["low", "medium" , "high"].map((p,idx) => (
                        <Button key={idx} variant={"outline"} size={"sm"}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Button>
                    ))}
                </div>
            </div> */}
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
            <div className="flex justify-between pt-4">
                <Button type="button" variant={"outline"}>Clear Filter</Button>
                <Button type="button" onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Board Content */}
      <main>
        {/* Stats */}
        <div>
            <div>
                <div>
                    <span>Total Tasks</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
