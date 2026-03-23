import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface CategoryList {
  id: number;
  categoryType: string;
}

const CategoryList = () => {
  const [data, setcategory] = useState<CategoryList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<CategoryList[]>("master/categories")
      .then((data) => setcategory(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-[#08203E] to-[#557C93]">

      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          📂 Categories
        </h1>

        <button className="backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-white shadow hover:bg-white/30 transition">
          + Add Category
        </button>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden relative z-10">
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            
            <thead>
              <tr className="text-white/80 border-b border-white/20">
                <th className="px-6 py-4 text-left font-medium">Id</th>
                <th className="px-6 py-4 text-left font-medium">Category Type</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/10 hover:bg-white/10 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">
                    {c.id}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-300/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold border border-blue-200/20">
                      {c.categoryType}
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

export default CategoryList;