import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const deleteMutation = rqClient.useMutation("delete", "/boards/{boardId}", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards")
      );
    },
  });

  return {
    deleteBoard: (boardId: string) =>
      deleteMutation.mutate({ params: { path: { boardId } } }),
    getIsPending: (boardId: string) =>
      deleteMutation.isPending &&
      deleteMutation.variables?.params?.path?.boardId === boardId,
  };
}
