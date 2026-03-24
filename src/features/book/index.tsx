import { Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Create from "./pages/create";
import Edit from "./pages/edit";
import Delete from "./pages/delete";  
export default function Book() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="books/create" element={<Create />} />
      <Route path="books/edit/:id" element={<Edit />} />
      <Route path="books/delete/:id" element={<Delete />} />
    </Routes>
  );
}