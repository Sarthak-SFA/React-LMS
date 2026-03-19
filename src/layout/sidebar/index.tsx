import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const nav = useNavigate();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Library</h2>

      <div className="space-y-3">
        <div onClick={() => nav("/")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
          Dashboard
        </div>

        <div onClick={() => nav("/books")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
          Books
        </div>

        <div onClick={() => nav("/categories")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
          Categories
        </div>

        <div onClick={() => nav("/members")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
          Members
        </div>

        <div onClick={() => nav("/issues")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">
          Book Issues
        </div>
      </div>
    </div>
  );
};

export default Sidebar;