import { Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";  

export default function BookIssue() {
  return(
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="issues/create" element={<Create />} />
      <Route path="issues/edit/:id" element={<Edit />} />
       <Route path="issues/delete/:id" element={<Delete />} />
    </Routes>
  )
}