import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/model/routes";
import { href, Link } from "react-router-dom";

const BoardsList = () => {
  const res = rqClient.useQuery("get", "/boards");

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
      },
    }
  );

  return (
    <div>
      {res.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() =>
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              })
            }
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export const Component = BoardsList;
