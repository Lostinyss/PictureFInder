import { create } from "zustand";
import type { Board, SavedImage } from "../types/image";

export interface BoardState {
  boards: Board[];
  createBoard: (name: string, description?: string) => string;
  renameBoard: (id: string, name: string, description?: string) => void;
  deleteBoard: (id: string) => void;
  toggleImage: (boardId: string, image: SavedImage) => void;
  removeImage: (boardId: string, imageId: string) => void;
  isImageSaved: (imageId: string) => boolean;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],

  createBoard: (name, description = "") => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: Date.now(),
      images: [],
    };

    set((state) => ({
      boards: [...state.boards, newBoard],
    }));

    return newBoard.id;
  },

  renameBoard: (id, name, description = "") => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id
          ? { ...board, name, description }
          : board
      ),
    }));
  },

  deleteBoard: (id) => {
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
    }));
  },

  toggleImage: (boardId, image) => {
    set((state) => ({
      boards: state.boards.map((board) => {
        if (board.id !== boardId) return board;

        const alreadySaved = board.images.some(
          (savedImage) => savedImage.id === image.id
        );

        return {
          ...board,
          images: alreadySaved
            ? board.images.filter(
                (savedImage) => savedImage.id !== image.id
              )
            : [...board.images, image],
        };
      }),
    }));
  },

  removeImage: (boardId, imageId) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              images: board.images.filter(
                (image) => image.id !== imageId
              ),
            }
          : board
      ),
    }));
  },

  isImageSaved: (imageId) => {
    return get().boards.some((board) =>
      board.images.some((image) => image.id === imageId)
    );
  },
}));