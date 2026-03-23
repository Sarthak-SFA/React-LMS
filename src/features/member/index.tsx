import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface Member {
  id: number;
  memberName: string;
  memberType: string;
}

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    memberName: "",
    memberType: "",
  });

  useEffect(() => {
    ApiService.get<Member[]>("master/members")
      .then((data) => setMembers(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.memberName || !formData.memberType) {
        alert("Please fill in all fields");
        return;
      }

      await ApiService.post("master/members/add", formData);

      const updated = await ApiService.get<Member[]>("master/members");
      setMembers(updated ?? []);

      setFormData({ memberName: "", memberType: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding member", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 blur-3xl opacity-20 rounded-full"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl text-white font-semibold">👥 Members</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white/20 text-white px-4 py-2 rounded-xl border border-white/30 hover:bg-white/30"
        >
          + Add Member
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20 text-white/80">
                <th className="px-6 py-4 text-left">Id</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Member Type</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b border-white/10 hover:bg-white/10">
                  <td className="px-6 py-4">{m.id}</td>
                  <td className="px-6 py-4">{m.memberName}</td>
                  <td className="px-6 py-4">{m.memberType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Add Member</h2>

            <div className="space-y-3">
              <input
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="Member Name"
                className="w-full border p-2 rounded"
              />

              <input
                name="memberType"
                value={formData.memberType}
                onChange={handleChange}
                placeholder="Member Type"
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

export default MemberList;