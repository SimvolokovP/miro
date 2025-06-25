import {
  BoardsListLayout,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";

import { BoardsSidebar } from "./ui/boards-sidebar";
import { Button } from "@/shared/ui/kit/button";
import { useCreateBoard } from "./models/use-create-board";

function BoardsListCreatePage() {
  const { create, isPending } = useCreateBoard();

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title="Создать доску"
          description="Здесь вы можете создать доску"
        />
      }
    >
      <Button className="max-w-[128px]" onClick={create} disabled={isPending}>
        Создать
      </Button>
    </BoardsListLayout>
  );
}

export const Component = BoardsListCreatePage;
