import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../statcard";
import { ApiService } from "../../services";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Stats {
  books: number;
  members: number;
  issues: number;
  categories: number;
}

interface Book { id: number; categoryId: number; }

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ books: 0, members: 0, issues: 0, categories: 0 });
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<{ id: number; categoryType: string }[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, membersRes, issuesRes, categoriesRes] = await Promise.all([
          ApiService.get<Book[]>("master/books"),
          ApiService.get<any[]>("master/members"),
          ApiService.get<any[]>("master/issues"),
          ApiService.get<{ id: number; categoryType: string }[]>("master/categories"),
        ]);

        setBooks(booksRes ?? []);
        setCategories(categoriesRes ?? []);
        setIssues(issuesRes ?? []);

        setStats({
          books: booksRes?.length ?? 0,
          members: membersRes?.length ?? 0,
          issues: issuesRes?.length ?? 0,
          categories: categoriesRes?.length ?? 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

 
  const activityData = {
    labels: issues.map(i => new Date(i.issueDate).toLocaleDateString()), 
    datasets: [
      {
        label: "Books Issued",
        data: issues.map(() => 1), 
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const distributionData = {
    labels: categories.map(c => c.categoryType),
    datasets: [
      {
        label: "Books per Category",
        data: categories.map(c => books.filter(b => b.categoryId === c.id).length),
        backgroundColor: categories.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#08203E] to-[#557C93] relative overflow-hidden">

      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 text-center space-y-10">
        <h1 className="text-4xl font-semibold text-white tracking-wide">📚 Library Dashboard</h1>

       
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

       
        <div className="grid grid-cols-3 gap-6 mt-10 w-[800px]">
          <div className="col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl text-white">
            <h2 className="font-semibold mb-2">Library Activity (Books Issued)</h2>
            <div className="h-40">
              <Bar data={activityData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-2xl text-white">
            <h2 className="font-semibold mb-2">Books Distribution by Category</h2>
            <div className="h-40">
              <Pie data={distributionData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;