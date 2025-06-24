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

const BoardsList = () => {
  const boardFilters = useBoardsFilters();
  const boardListQuery = useBoardsList({
    sort: boardFilters.sort,
    search: boardFilters.search,
  });

  return (
    <div>
      <div className="flex flex-col">
        <Label htmlFor="sort">Сортировка</Label>
        <Select
          value={boardFilters.sort}
          onValueChange={(v) => boardFilters.setSort(v as BoardsSortOption)}
        >
          <SelectTrigger id="sort" className="w-full">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastOpenedAt">По дате открытия</SelectItem>
            <SelectItem value="createdAt">По дате создания</SelectItem>
            <SelectItem value="updatedAt">По дате обновления</SelectItem>
            <SelectItem value="name">По имени</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
      {boardListQuery.boards.length === 0 && <div>Not found</div>}
      {boardListQuery.hasNextPage && (
        <div ref={boardListQuery.cursorRef}>
          {boardListQuery.isFetchingNextPage && <div>Load more..</div>}
        </div>
      )}
    </div>
  );
};

export const Component = BoardsList;
