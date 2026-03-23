// src/features/book/pages/Edit.tsx
import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../../../services';
import Form from '../components/form';
import { useUpdateBookMutation } from '../query';

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useUpdateBookMutation();

  // ❗ Safety check
  if (!id) {
    return <div className="p-6">Invalid Book ID</div>;
  }

  // 📥 Load book data
  const handleLoad = useCallback(async (): Promise<Master.BookItem> => {
    const data = await ApiService.get<Master.BookItem>(
      `master/books/${id}`
    );

    if (!data) {
      return {
        id: 0,
        bookName: '',
        authorName: '',
        publisherName: '',
        bookPrice: 0,
        categoryId: 0,
      };
    }

    return data;
  }, [id]);

  // 📤 Submit update
  const handleSubmit = async (book: Master.BookItem) => {
    await mutateAsync(book);
    alert('Book updated successfully!');
    navigate('/books');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      <Form
        onLoad={handleLoad}
        onSubmit={handleSubmit}
        submitCaption={isPending ? 'Updating...' : 'Update Book'}
      />
    </div>
  );
}