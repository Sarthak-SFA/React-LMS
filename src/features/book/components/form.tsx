import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

interface FormProps {
  onSubmit: (data: Master.BookForm) => Promise<void>;
  categories: Master.CategoryItem[];
  submitCaption: string;
  initialData?: Master.BookItem; 
}

export default function Form({
  onSubmit,
  categories,
  submitCaption,
  initialData,
}: FormProps) {
  const { register, handleSubmit, reset, formState } =
    useForm<Master.BookForm>();

  useEffect(() => {
    if (initialData) {
    
      const { id, ...rest } = initialData;
      reset(rest);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register('bookName')} placeholder="Book Name" />
      <input {...register('authorName')} placeholder="Author Name" />
      <input {...register('publisherName')} placeholder="Publisher Name" />
      <input {...register('bookPrice', { valueAsNumber: true })} type="number" />

      <select {...register('categoryId', { valueAsNumber: true })}>
        <option value={0}>Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.categoryType}
          </option>
        ))}
      </select>

      <button disabled={formState.isSubmitting}>
        {submitCaption}
      </button>
    </form>
  );
}