"use client"

import Navbar from "@/components/general/navbar";
import { useSingleBoard } from "@/lib/hooks/useBoards";
import { useParams } from "next/navigation";
import React from "react";

const BoardPage = () => {
    const {id} = useParams<{id : string}>()
  const {board} = useSingleBoard(id);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar boardTitle={board?.title} />
    </div>
  );
};

export default BoardPage;
