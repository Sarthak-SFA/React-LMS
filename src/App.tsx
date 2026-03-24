import { Routes, Route } from "react-router-dom";
import Sidebar from "./layout/sidebar";
import Dashboard from "./layout/dashboard";
import Book from "./features/book";
import CategoryList from "./features/category";
import MemberList from "./features/member";
import BookIssueList from "./features/bookIssue";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route
        path="/*"
        element={
          <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
              <Routes>
                <Route path="books/*" element={<Book />} />
                <Route path="categories" element={<CategoryList />} />
                <Route path="members" element={<MemberList />} />
              <Route path="issues/*" element={<BookIssueList />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;