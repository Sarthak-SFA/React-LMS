import { useParams, useNavigate } from "react-router-dom";
import { useDeleteIssueMutation } from "../queries";

export default function Delete() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useDeleteIssueMutation();

  const handleDelete = async () => {
    await mutateAsync(Number(id));
    navigate("/issues");
  };

  return (
    <div className="p-6">
      <h2>Delete Issue?</h2>

      <button onClick={() => navigate("/issues")}>Cancel</button>

      <button onClick={handleDelete}>
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}