import { useNavigate } from 'react-router-dom';
import { useNewBookMutation, useCategoriesQuery } from '../queries';
import Form from '../components/Form';

const Create = () => {
  const { mutate, isPending } = useNewBookMutation();
  const { data: categories = [] } = useCategoriesQuery();
  const navigate = useNavigate();

  const handleSubmit = async (data: Master.BookForm) => {
    return new Promise<void>((resolve, reject) => {
      mutate(data, {
        onSuccess: () => {
          alert('Book added successfully!');
          navigate('/books');
          resolve();
        },
        onError: () => {
          alert('Failed to add book.');
          reject();
        },
      });
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>

      <Form
        onSubmit={handleSubmit}
        categories={categories}
        submitCaption={isPending ? 'Saving...' : 'Submit'}
      />
    </div>
  );
};

export default Create;