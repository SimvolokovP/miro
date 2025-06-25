import { useState } from "react";

import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { viewMode, ViewModeToggle } from "./ui/view-mode-toggle";

import { BoardsSidebar } from "./ui/boards-sidebar";
import { useBoardsList } from "./models/use-boards-list";
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";

function BoardsListPage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });

  const [viewMode, setViewMode] = useState<viewMode>("cards");

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять своими избранными досками"
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        cursorRef={boardsQuery.cursorRef}
        hasCursor={boardsQuery.hasNextPage}
        mode={viewMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardItem key={board.id} board={board} />
          ))
        }
        renderGrid={() =>
          boardsQuery.boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
