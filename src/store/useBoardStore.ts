// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { Board, SavedImage } from "../types/image";
import { MOCK_BOARDS } from "../mocks/images";

export interface BoardState {
  boards: Board[];
  createBoard: (name: string, description?: string) => string; // คืน id ของบอร์ดใหม่
  renameBoard: (id: string, name: string, description?: string) => void;
  deleteBoard: (id: string) => void;
  toggleImage: (boardId: string, image: SavedImage) => void;
  removeImage: (boardId: string, imageId: string) => void;
  isImageSaved: (imageId: string) => boolean;
}

const mockState: BoardState = {
  boards: MOCK_BOARDS,
  createBoard: () => {
    console.info("TODO createBoard");
    return "mock-board-new";
  },
  renameBoard: () => console.info("TODO renameBoard"),
  deleteBoard: () => console.info("TODO deleteBoard"),
  toggleImage: () => console.info("TODO toggleImage"),
  removeImage: () => console.info("TODO removeImage"),
  isImageSaved: (imageId) => MOCK_BOARDS.some((b) => b.images.some((i) => i.id === imageId)),
};

export function useBoardStore<T>(selector: (s: BoardState) => T): T {
  return selector(mockState);
}
