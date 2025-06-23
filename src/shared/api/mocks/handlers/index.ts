import { HttpResponse } from "msw";
import { http } from "../http";
import { ApiSchemas } from "../../schema";

const boards: ApiSchemas["Board"][] = [
  {
    id: "board-1",
    name: "Marketing Campaign",
  },
  {
    id: "board-2",
    name: "Product Roadmap",
  },
];

export const handlers = [
  http.get("/boards", () => {
    return HttpResponse.json(boards);
  }),
  http.delete("/boards/{boardId}", ({ params }) => {
    const { boardId } = params;

    const index = boards.findIndex((board) => board.id === boardId);

    if (index === -1) {
      return HttpResponse.json({ message: "Board not found", code: "NOT_FOUND" });
    }

    boards.splice(index, 1);
    return HttpResponse.json({ message: "Board deleted", code: "OK" });
  }),
];
