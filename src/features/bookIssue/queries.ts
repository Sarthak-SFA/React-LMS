import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../services";

const KEY = ["issues"];

export const useBookIssuesQuery = () => {
  return useQuery({
    queryKey: KEY,
    queryFn: () => ApiService.get("master/issues"),
  });
};

export const useCreateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      ApiService.post("master/issues/add", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useUpdateIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      ApiService.put(`master/issues/${data.id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useDeleteIssueMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      ApiService.remove(`master/issues/${id}/delete`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEY });
    },
  });
};