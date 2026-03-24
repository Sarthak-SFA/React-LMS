import { useEffect, useState } from "react";
import Loader from "../../../shared/components/loader";
import { ApiService } from "../../../services";
import {
  useBookIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} from "../queries";

interface Book {
  id: number;
  bookName: string;
}

interface Member {
  id: number;
  memberName: string;
}

const List = () => {
  const { data: issues = [] } = useBookIssuesQuery() as {
    data: Master.IssueItem[];
    isLoading: boolean;
  };
  const { isLoading } = useBookIssuesQuery();

  const createMutation = useCreateIssueMutation();
  const updateMutation = useUpdateIssueMutation();
  const deleteMutation = useDeleteIssueMutation();

  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const future = new Date();
  future.setDate(new Date().getDate() + 15);

  const [formData, setFormData] = useState<Master.IssueItem>({
    id: 0,
    bookId: 0,
    memberId: 0,
    issueDate: today,
    returnDate: future.toISOString().split("T")[0],
    renewDate: "",
    renewReturnDate: "",
  });

  useEffect(() => {
    Promise.all([
      ApiService.get<Book[]>("master/books"),
      ApiService.get<Member[]>("master/members"),
    ]).then(([b, m]) => {
      setBooks(b ?? []);
      setMembers(m ?? []);
    });
  }, []);

  const handleEdit = (item: Master.IssueItem) => {
    setFormData(item);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this issue?")) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = () => {
    if (!formData.bookId || !formData.memberId) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      bookId: formData.bookId,
      memberId: formData.memberId,
      issueDate: formData.issueDate,
      returnDate: formData.returnDate,
    };

    if (editMode) {
      updateMutation.mutate(
        { id: formData.id, ...payload },
        {
          onSuccess: () => {
            setShowForm(false);
            setEditMode(false);
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setShowForm(false);
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-semibold tracking-wide">
          📖 Book Issues
        </h1>

        <button
          onClick={() => {
            setEditMode(false);
            setFormData({
              id: 0,
              bookId: 0,
              memberId: 0,
              issueDate: today,
              returnDate: future.toISOString().split("T")[0],
              renewDate: "",
              renewReturnDate: "",
            });
            setShowForm(true);
          }}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-xl border border-white/20 shadow-md transition"
        >
          + Issue Book
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-white text-sm">
          <thead>
            <tr className="border-b border-white/20 text-white/70">
              <th className="px-6 py-4 text-left">Book</th>
              <th className="px-6 py-4 text-left">Member</th>
              <th className="px-6 py-4 text-left">Issue</th>
              <th className="px-6 py-4 text-left">Return</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((i) => (
              <tr
                key={i.id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >
                <td className="px-6 py-4">
                  {books.find((b) => b.id === i.bookId)?.bookName}
                </td>

                <td className="px-6 py-4">
                  {members.find((m) => m.id === i.memberId)?.memberName}
                </td>

                <td className="px-6 py-4">{i.issueDate}</td>
                <td className="px-6 py-4">{i.returnDate}</td>

                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="bg-yellow-500/90 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs shadow transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(i.id)}
                    className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl w-[400px] shadow-2xl">
            <h2 className="text-lg font-semibold mb-4">
              {editMode ? "Edit Issue" : "Create Issue"}
            </h2>

            <div className="space-y-3">
              <select
                value={formData.bookId}
                onChange={(e) =>
                  setFormData({ ...formData, bookId: Number(e.target.value) })
                }
                className="w-full border p-2 rounded-lg"
              >
                <option value={0}>Select Book</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bookName}
                  </option>
                ))}
              </select>

              <select
                value={formData.memberId}
                onChange={(e) =>
                  setFormData({ ...formData, memberId: Number(e.target.value) })
                }
                className="w-full border p-2 rounded-lg"
              >
                <option value={0}>Select Member</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.memberName}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />

              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) =>
                  setFormData({ ...formData, returnDate: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
              >
                {editMode ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;