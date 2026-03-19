import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface BookList {
  id: number;
  bookName: string;
  authorName: string;
  publisherName: string;
  bookPrice: number;
  categoryId: number;
}

const BookList = () => {
  const [books, setBooks] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<BookList[]>("master/books")
      .then((data) => setBooks(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">
      
      {/* Matte overlay for softness */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Soft glow blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          📚 Library Books
        </h1>

        <button className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-white shadow hover:bg-white/30 transition">
          + Add Book
        </button>
      </div>

      {/* 🧊 GLASS CARD */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden relative z-10">
        
        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            
            {/* HEADER */}
            <thead>
              <tr className="text-white/80 border-b border-white/20">
                <th className="px-6 py-4 text-left font-medium">Book</th>
                <th className="px-6 py-4 text-left font-medium">Author</th>
                <th className="px-6 py-4 text-left font-medium">Publisher</th>
                <th className="px-6 py-4 text-left font-medium">Price</th>
                <th className="px-6 py-4 text-left font-medium">Category</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {books.map((b, i) => (
                <tr
                  key={i}
                  className="border-b border-white/10 hover:bg-white/10 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">
                    {b.bookName}
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {b.authorName}
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {b.publisherName}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                      ₹ {b.bookPrice}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-300/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/20">
                      {b.categoryId}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default BookList;