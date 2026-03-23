import { useState } from 'react';
import Loader from '../../components/loader';
import {
  useBooksQuery,
  useCategoriesQuery,
  useNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from '../book/query';

const BookList = () => {
  const { data: books = [], isLoading: booksLoading } = useBooksQuery();
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesQuery();

  const addBookMutation = useNewBookMutation();
  const updateBookMutation = useUpdateBookMutation();
  const deleteBookMutation = useDeleteBookMutation();

  const loading = booksLoading || categoriesLoading;

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState<Master.BookItem>({
    id: 0,
    bookName: '',
    authorName: '',
    publisherName: '',
    bookPrice: 0,
    categoryId: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'bookPrice' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleEdit = (book: Master.BookItem) => {
    setFormData(book);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Delete this book?')) return;
    deleteBookMutation.mutate(id);
  };

  const handleSubmit = () => {
    if (!formData.categoryId) return alert('Select category');

    if (editMode) {
      updateBookMutation.mutate(formData, {
        onSuccess: () => {
          alert('Book updated!');
          setShowForm(false);
          setEditMode(false);
        },
      });
    } else {
      addBookMutation.mutate(formData, {
        onSuccess: () => {
          alert('Book added!');
          setShowForm(false);
        },
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">
    
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl text-white font-semibold">📚 Library Books</h1>

        <button
          onClick={() => {
            setEditMode(false);
            setFormData({
              id: 0,
              bookName: '',
              authorName: '',
              publisherName: '',
              bookPrice: 0,
              categoryId: 0,
            });
            setShowForm(true);
          }}
          className="bg-white/20 text-white px-4 py-2 rounded-xl border border-white/30 hover:bg-white/30"
        >
          + Add Book
        </button>
      </div>

      
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20 text-white/80">
                <th className="px-6 py-4 text-left">Book</th>
                <th className="px-6 py-4 text-left">Author</th>
                <th className="px-6 py-4 text-left">Publisher</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((b) => (
                <tr key={b.id} className="border-b border-white/10 hover:bg-white/10">
                  <td className="px-6 py-4">{b.bookName}</td>
                  <td className="px-6 py-4">{b.authorName}</td>
                  <td className="px-6 py-4">{b.publisherName}</td>
                  <td className="px-6 py-4">₹ {b.bookPrice}</td>
                  <td className="px-6 py-4">
                    {categories.find((c) => c.id === b.categoryId)?.categoryType}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(b)}
                      className="bg-yellow-500 px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(b.id)}
                      className="bg-red-600 px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? 'Edit Book' : 'Add Book'}
            </h2>

            <div className="space-y-3">
              <input name="bookName" value={formData.bookName} onChange={handleChange} className="w-full border p-2 rounded" placeholder='Book Name' />
              <input name="authorName" value={formData.authorName} onChange={handleChange} className="w-full border p-2 rounded" placeholder='Author Name' />
              <input name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full border p-2 rounded" placeholder='Publisher Name' />
              <input name="bookPrice" type="number" value={formData.bookPrice} onChange={handleChange} className="w-full border p-2 rounded" placeholder='Price' />

              <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full border p-2 rounded">
                <option value={0}>Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.categoryType}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={addBookMutation.isPending || updateBookMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {(addBookMutation.isPending || updateBookMutation.isPending)
                  ? 'Saving...'
                  : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;