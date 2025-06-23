import { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router-dom";

const BoardPage = () => {
  const params = useParams<PathParams[typeof ROUTES.BOARD]>();

  return <div>{params.boardId}</div>;
};

export const Component = BoardPage;
