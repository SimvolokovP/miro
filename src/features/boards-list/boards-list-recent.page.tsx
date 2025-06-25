import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { href, Link } from "react-router-dom";
import { useBoardsList } from "./models/use-boards-list";
import {
  BoardsSortOption,
  useBoardsFilters,
} from "./models/use-boards-filters";
import { Label } from "@/shared/ui/kit/label";
import { Select } from "@/shared/ui/kit/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useDebouncedValue } from "@/shared/lib/react";
import BoardsSelect from "./ui/boards-select";

const BoardsListRecent = () => {
  const boardFilters = useBoardsFilters();
  const boardListQuery = useBoardsList({
    sort: boardFilters.sort,
    search: useDebouncedValue(boardFilters.search, 300),
  });

  return (
    <div className="">
      <div className="flex flex-col">
        <Label htmlFor="sort">Сортировка</Label>
        <BoardsSelect
          value={boardFilters.sort}
          onValueChange={boardFilters.setSort}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boardListQuery.isPending ? (
          <div>Load</div>
        ) : (
          boardListQuery.boards.map((board) => (
            <Card key={board.id}>
              <CardHeader>
                <Button asChild variant={"link"}>
                  <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                    {board.name}
                  </Link>
                </Button>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          ))
        )}
      </div>
      {boardListQuery.boards.length === 0 && <div>Not found</div>}
      {boardListQuery.hasNextPage && (
        <div ref={boardListQuery.cursorRef}>
          {boardListQuery.isFetchingNextPage && <div>Load more..</div>}
        </div>
      )}
    </div>
  );
};

export const Component = BoardsListRecent;
