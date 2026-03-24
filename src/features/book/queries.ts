import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '../../services';

const BOOK_KEY = ['@master/books'];
const CATEGORY_KEY = ['@master/categories'];

export function useBooksQuery() {
  return useQuery({
    queryKey: BOOK_KEY,
    queryFn: async () =>
      await ApiService.get<Master.BookItem[]>('master/books'),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: CATEGORY_KEY,
    queryFn: async () =>
      await ApiService.get<Master.CategoryItem[]>('master/categories'),
  });
}

export function useNewBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<Master.BookItem, Error, Master.BookForm>({
    mutationFn: async (book) => {
      const res = await ApiService.post<Master.BookItem>(
        `master/books/category/${book.categoryId}/add`,
        book
      );

      if (!res) throw new Error('Book creation failed');

      return res;
    },

    onSuccess: (result) => {
      queryClient.setQueryData(
        BOOK_KEY,
        (old: Master.BookItem[] | undefined): Master.BookItem[] => {
          if (!old) return [result];
          return [...old, result];
        }
      );
    },
  });
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<Master.BookItem, Error, Master.BookItem>({
    mutationFn: async (book) => {
      const res = await ApiService.put<Master.BookItem>(
        `master/books/${book.id}/update`,
        book
      );

      if (!res) throw new Error('Book update failed');

      return res;
    },

    onSuccess: (updatedBook) => {
      queryClient.setQueryData(
        BOOK_KEY,
        (old: Master.BookItem[] | undefined): Master.BookItem[] => {
          if (!old) return [];

          return old.map((b) =>
            b.id === updatedBook.id ? updatedBook : b
          );
        }
      );
    },
  });
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await ApiService.remove(`master/books/${id}/delete`);
    },

    onSuccess: (_, id) => {
      queryClient.setQueryData(
        BOOK_KEY,
        (old: Master.BookItem[] | undefined): Master.BookItem[] => {
          if (!old) return [];

        return old.filter((b) => b.id !== id);
        }
      );
    },
  });
}