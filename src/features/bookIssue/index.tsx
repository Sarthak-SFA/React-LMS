      import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface BookIssueList {
  id: number;
  bookId: number;
  memberId: number;
  issueDate: string;
  returnDate: string;
  renewDate: string;
  renewReturnDate: string;
}

const BookIssueList = () => {
  const [data, setBookIssue] = useState<BookIssueList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<BookIssueList[]>("master/issues")
      .then((res) => setBookIssue(res ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">
      
      {/* Matte overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          📖 Book Issues
        </h1>

        <button className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-white shadow hover:bg-white/30 transition">
          + Issue Book
        </button>
      </div>

      {/* 🧊 GLASS CARD */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden relative z-10">
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            
            {/* HEADER */}
            <thead>
              <tr className="text-white/80 border-b border-white/20">
                <th className="px-6 py-4 text-left font-medium">ID</th>
                <th className="px-6 py-4 text-left font-medium">Book</th>
                <th className="px-6 py-4 text-left font-medium">Member</th>
                <th className="px-6 py-4 text-left font-medium">Issue Date</th>
                <th className="px-6 py-4 text-left font-medium">Return Date</th>
                <th className="px-6 py-4 text-left font-medium">Renew Date</th>
                <th className="px-6 py-4 text-left font-medium">Renew Return</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {data.map((i, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/10 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{i.id}</td>

                  <td className="px-6 py-4 text-white/80">
                    <span className="bg-blue-300/20 px-3 py-1 rounded-full text-xs border border-blue-200/20">
                      {i.bookId}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    <span className="bg-purple-300/20 px-3 py-1 rounded-full text-xs border border-purple-200/20">
                      {i.memberId}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {i.issueDate || "-"}
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {i.returnDate || "-"}
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {i.renewDate || "-"}
                  </td>

                  <td className="px-6 py-4 text-white/80">
                    {i.renewReturnDate || "-"}
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

export default BookIssueList;