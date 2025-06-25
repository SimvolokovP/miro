import { useBoardsList } from "./models/use-boards-list";
import { useBoardsFilters } from "./models/use-boards-filters";

import { useDebouncedValue } from "@/shared/lib/react";

import { useState } from "react";
import { viewMode, ViewModeToggle } from "./ui/view-mode-toggle";
import {
  BoardsListLayout,
  BoardsListLayoutContent,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";
import { BoardsSidebar } from "./ui/boards-sidebar";
import BoardsSelect from "./ui/boards-select";
import { BoardsInput } from "./ui/boards-input";
import { BoardsListItem } from "./ui/boards-list-item";
import { BoardsListCard } from "./ui/boards-list-card";

const BoardsList = () => {
  const boardFilters = useBoardsFilters();
  const boardListQuery = useBoardsList({
    sort: boardFilters.sort,
    search: useDebouncedValue(boardFilters.search, 300),
  });

  const [viewMode, setViewMode] = useState<viewMode>("cards");

  return (
    <>
      <BoardsListLayout
        filters={
          <BoardsListLayoutFilters
            sort={
              <BoardsSelect
                value={boardFilters.sort}
                onValueChange={boardFilters.setSort}
              />
            }
            filters={
              <BoardsInput
                value={boardFilters.search}
                onValueChange={boardFilters.setSearch}
              />
            }
            actions={
              <ViewModeToggle
                value={viewMode}
                onChange={(value) => setViewMode(value)}
              />
            }
          />
        }
        header={
          <BoardsListLayoutHeader
            title="Доски"
            description="Здесь вы можете просматривать и управлять своими досками"
            actions={
              <>
                <Button>
                  <PlusIcon />
                  Создать доску
                </Button>
              </>
            }
          />
        }
        sidebar={<BoardsSidebar />}
      >
        <BoardsListLayoutContent
          isEmpty={boardListQuery.boards.length === 0}
          isPending={boardListQuery.isPending}
          isPendingNext={boardListQuery.isFetchingNextPage}
          cursorRef={boardListQuery.cursorRef}
          hasCursor={boardListQuery.hasNextPage}
          mode={viewMode}
          renderList={() =>
            boardListQuery.boards.map((board) => (
              <BoardsListItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            boardListQuery.boards.map((board) => (
              <BoardsListCard key={board.id} board={board} />
            ))
          }
        />
      </BoardsListLayout>
    </>
  );
};

export const Component = BoardsList;
