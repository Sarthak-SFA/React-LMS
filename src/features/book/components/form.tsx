import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface FormProps {
  onSubmit: (data: Master.BookForm) => Promise<void>;
  categories: Master.CategoryItem[];
  submitCaption: string;
  initialData?: Master.BookForm;
}

export default function Form({
  onSubmit,
  categories,
  submitCaption,
  initialData,
}: FormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<Master.BookForm>();

  // ✅ preload data (for edit)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded px-6 py-6 space-y-3"
    >
      <input
        {...register('bookName')}
        placeholder="Book Name"
        className="w-full border p-2 rounded"
      />

      <input
        {...register('authorName')}
        placeholder="Author Name"
        className="w-full border p-2 rounded"
      />

      <input
        {...register('publisherName')}
        placeholder="Publisher Name"
        className="w-full border p-2 rounded"
      />

      <input
        {...register('bookPrice', { valueAsNumber: true })}
        type="number"
        placeholder="Price"
        className="w-full border p-2 rounded"
      />

      {/* ✅ CATEGORY DROPDOWN */}
      <select
        {...register('categoryId', { valueAsNumber: true })}
        className="w-full border p-2 rounded"
      >
        <option value={0}>Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.categoryType}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {submitCaption}
      </button>
    </form>
  );
}