import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../statcard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    issues: 0,
    categories: 0,
  });

  useEffect(() => {
    Promise.all([]).then(() => {
      setStats({
        books: 0,
        members: 0,
        issues: 0,
        categories: 0,
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#08203E] to-[#557C93] relative overflow-hidden">
      
      {/* Matte Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Glow Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center space-y-10">
        
        {/* TITLE */}
        <h1 className="text-4xl font-semibold text-white tracking-wide">
          📚 Library Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-8">
          
          <div onClick={() => navigate("/books")} className="cursor-pointer">
            <StatCard title="Books" value={stats.books} color="bg-orange-500" />
          </div>

          <div onClick={() => navigate("/members")} className="cursor-pointer">
            <StatCard title="Members" value={stats.members} color="bg-green-500" />
          </div>

          <div onClick={() => navigate("/issues")} className="cursor-pointer">
            <StatCard title="Issues" value={stats.issues} color="bg-red-500" />
          </div>

          <div onClick={() => navigate("/categories")} className="cursor-pointer">
            <StatCard title="Categories" value={stats.categories} color="bg-blue-500" />
          </div>

        </div>

        {/* OPTIONAL: Charts Section (Hidden for now but styled) */}
        <div className="grid grid-cols-3 gap-6 mt-10 w-[800px]">
          
          <div className="col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl text-white">
            <h2 className="font-semibold mb-2">Library Activity</h2>
            <div className="h-40 flex items-center justify-center text-white/60">
              Chart coming
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl text-white">
            <h2 className="font-semibold mb-2">Distribution</h2>
            <div className="h-40 flex items-center justify-center text-white/60">
              Pie chart
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;