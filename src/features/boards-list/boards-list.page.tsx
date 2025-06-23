import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

const BoardsList = () => {
  return (
    <div>
      <Link to={href(ROUTES.BOARD, {boardId: "1"})}>link</Link>
    </div>
  );
};

export const Component = BoardsList;
