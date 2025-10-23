"use client";
import { useUser } from "@clerk/nextjs";
import { boadDataService, boardService } from "../services";
import { useCallback, useEffect, useState } from "react";
import { Board, Column } from "../supabase/models";
import { useSupabase } from "../supabase/SupabaseProvider";

export function useBoards() {
  const { user } = useUser();
  const { supabase } = useSupabase();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoards = useCallback(
    async function () {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const data = await boardService.getBoards(supabase!, user.id);
        setBoards(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load boards"
        );
      } finally {
        setLoading(false);
      }
    },
    [supabase, user]
  );

  useEffect(() => {
    if (user) {
      loadBoards();
    }
  }, [user, loadBoards]);

  async function createBoard(boardData: {
    title: string;
    description?: string;
    color?: string;
  }) {
    if (!user) throw new Error("User not authenticated");
    try {
      const newBoard =
        await boadDataService.createBoardWithDefaultColumns(
          supabase!,
          {
            ...boardData,
            userId: user.id,
          }
        );
      setBoards((prev) => [newBoard, ...prev]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create board"
      );
    } finally {
      setLoading(false);
    }
  }

  return { boards, loading, error, createBoard };
}

export const useSingleBoard = (boardId : string) => {
 
  const { supabase } = useSupabase();
  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const loadBoard = useCallback(
    async function () {
      if (!boardId) return;
      try {
        setLoading(true);
        setError(null);
        const data = await boadDataService.getBoardWithColumns(supabase!, boardId);
        setBoard(data.board);
        setColumns(data.columns);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load boards"
        );
      } finally {
        setLoading(false);
      }
    },
    [supabase, boardId]
  );

  useEffect(() => {
    if (boardId) {
      loadBoard();
    }
  }, [boardId, loadBoard]);

  return {board, columns , loading , error}
}
