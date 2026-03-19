import { useEffect, useState } from "react";

import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface CategoryList {
  id: number;
  categoryType: string;
}

const CategoryList = () => {
  const [data, setcategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  ApiService.get<CategoryList[]>('master/categories')
  .then(data => setcategory(data ?? []))
  .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="card">
      <h2>Categories</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Category Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c, i) => (
            <tr key={i}>
              <td>{c.id}</td>
              <td>{c.categoryType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;