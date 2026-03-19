import { useEffect, useState } from "react";

import Loader from "../../components/loader";
import { ApiService } from "../../services";

interface MemberList {
  name: string;
  membertype: string;
}

const MemberList = () => {
  const [data, setMembers] = useState<any []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<MemberList[]>('master/members')
      .then(data => setMembers(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="card">
      <h2>Members</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Member Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, i) => (
            <tr key={i}>
              <td>{m.id }</td>
              <td>{m.memberName}</td>
              <td>{m.memberType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;