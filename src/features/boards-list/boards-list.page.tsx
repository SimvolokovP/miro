import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { href, Link } from "react-router-dom";

const BoardsList = () => {
  const res = rqClient.useQuery("get", "/boards");

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards")
        );
      },
    }
  );

  return (
    <div>
      {/* {res.data?.list.map((board) => (
        <Card key={board.id}>
          <CardHeader>
            <Button asChild variant={"link"}>
              <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                {board.name}
              </Link>
            </Button>
          </CardHeader>
          <CardFooter>
            <Button
              variant={"destructive"}
              disabled={deleteBoardMutation.isPending}
              onClick={() =>
                deleteBoardMutation.mutate({
                  params: { path: { boardId: board.id } },
                })
              }
            >
              delete
            </Button>
          </CardFooter>
        </Card>
      ))} */}
    </div>
  );
};

export const Component = BoardsList;
