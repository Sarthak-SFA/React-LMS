import { useParams, useNavigate } from "react-router-dom";
import { useUpdateIssueMutation } from "../queries";
import Form from "../components/Form";

export default function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync } = useUpdateIssueMutation();

  return (
    <Form
      submitCaption="Update Issue"
      onSubmit={async (data) => {
        await mutateAsync({
          ...data,
          id: Number(id),
        });
        navigate("/issues");
      }}
    />
  );
}