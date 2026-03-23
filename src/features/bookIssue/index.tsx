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

interface Book {
  id: number;
  bookName: string;
}

interface Member {
  id: number;
  memberName: string;
}

const BookIssueList = () => {
  const [data, setBookIssue] = useState<BookIssueList[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; 
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(today.getDate() + 15);
  const returnStr = fifteenDaysLater.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    bookId: "",
    memberId: "",
    issueDate: todayStr,
    returnDate: returnStr,
  });

  useEffect(() => {
    Promise.all([
      ApiService.get<BookIssueList[]>("master/issues"),
      ApiService.get<Book[]>("master/books"),
      ApiService.get<Member[]>("master/members"),
    ])
      .then(([issuesRes, booksRes, membersRes]) => {
        setBookIssue(issuesRes ?? []);
        setBooks(booksRes ?? []);
        setMembers(membersRes ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.bookId || !formData.memberId || !formData.issueDate || !formData.returnDate) {
        alert("Please fill all fields");
        return;
      }

      const payload = {
        bookId: Number(formData.bookId),
        memberId: Number(formData.memberId),
        issueDate: formData.issueDate,
        returnDate: formData.returnDate,
      };

      await ApiService.post("master/issues/add", payload);

      const updated = await ApiService.get<BookIssueList[]>("master/issues");
      setBookIssue(updated ?? []);

      setFormData({
        bookId: "",
        memberId: "",
        issueDate: todayStr,
        returnDate: returnStr,
      });

      setShowForm(false);
    } catch (error) {
      console.error("Error issuing book", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">

      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 blur-3xl opacity-20 rounded-full"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl font-semibold text-white tracking-wide">📖 Book Issues</h1>
        <button
          onClick={() => setShowForm(true)}
          className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-white shadow hover:bg-white/30 transition"
        >
          + Issue Book
        </button>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
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
            <tbody>
              {data.map((i) => (
                <tr key={i.id} className="border-b border-white/10 hover:bg-white/10">
                  <td className="px-6 py-4">{i.id}</td>
                  <td className="px-6 py-4 text-white/80">
                    <span className="bg-blue-300/20 px-3 py-1 rounded-full text-xs border border-blue-200/20">
                      {books.find(b => b.id === i.bookId)?.bookName || i.bookId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/80">
                    <span className="bg-purple-300/20 px-3 py-1 rounded-full text-xs border border-purple-200/20">
                      {members.find(m => m.id === i.memberId)?.memberName || i.memberId}
                    </span>
                  </td>
                  <td className="px-6 py-4">{i.issueDate || "-"}</td>
                  <td className="px-6 py-4">{i.returnDate || "-"}</td>
                  <td className="px-6 py-4">{i.renewDate || "-"}</td>
                  <td className="px-6 py-4">{i.renewReturnDate || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Issue Book</h2>
            <div className="space-y-3">
              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Book</option>
                {books.map(b => (
                  <option key={b.id} value={b.id}>{b.bookName}</option>
                ))}
              </select>

              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Member</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>{m.memberName}</option>
                ))}
              </select>

              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookIssueList;