import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiService } from '../../../services';
import Form from '../components/form';
import { useUpdateBookMutation, useCategoriesQuery } from '../query';

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useUpdateBookMutation();
  const { data: categories = [] } = useCategoriesQuery();

  const [initialData, setInitialData] = useState<Master.BookItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await ApiService.get<Master.BookItem>(
          `master/books/${id}`
        );
        setInitialData(data);
      } catch {
        alert('Failed to load book');
        navigate('/books');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (!id) {
    return <div className="p-6">Invalid Book ID</div>;
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const handleSubmit = async (data: Master.BookForm) => {
    try {
      await mutateAsync({
        id: Number(id), 
        ...data,
      });

      alert('Book updated successfully!');
      navigate('/books');
    } catch (err: any) {
      alert(err.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Book</h1>

      {initialData && (
        <Form
          onSubmit={handleSubmit}
          categories={categories}
          submitCaption={isPending ? 'Updating...' : 'Update Book'}
          initialData={initialData}
        />
      )}
    </div>
  );
}