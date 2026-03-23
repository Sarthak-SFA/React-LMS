import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation } from '../query';

export default function Delete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useDeleteBookMutation();

  if (!id) {
    return <div className="p-6">Invalid Book ID</div>;
  }

  const handleDelete = async () => {
    try {
      await mutateAsync(Number(id));
      alert('Book deleted successfully!');
      navigate('/books');
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Delete Book
        </h2>

        <p className="text-center mb-6">
          Are you sure you want to delete this book?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/books')}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}