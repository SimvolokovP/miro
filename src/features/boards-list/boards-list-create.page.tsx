import { useState } from "react";

import {
  BoardsListLayout,
  BoardsListLayoutHeader,
} from "./ui/boards-list-layout";

import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListCreatePage() {
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
      <div>Создать</div>
    </BoardsListLayout>
  );
}

export const Component = BoardsListCreatePage;
