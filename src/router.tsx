// router.tsx: กำหนดเส้นทางและ Routing ทั้งหมดของระบบ GetPic ตามโครงสร้าง React Router v7
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { SearchPage } from "./pages/SearchPage";
import { ImageDetailPage } from "./pages/ImageDetailPage";
import { BoardsPage } from "./pages/BoardsPage";
import { BoardDetailPage } from "./pages/BoardDetailPage";
import { CreditPage } from "./pages/CreditPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "image/:id",
        element: <ImageDetailPage />,
      },
      {
        path: "boards",
        element: <BoardsPage />,
      },
      {
        path: "boards/:boardId",
        element: <BoardDetailPage />,
      },
      {
        path: "credits",
        element: <CreditPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
