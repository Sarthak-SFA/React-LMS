import { useNavigate } from "react-router-dom";
import { useCreateIssueMutation } from "../queries";
import Form from "../components/Form";

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateIssueMutation();

  return (
    <Form
      submitCaption="Create Issue"
      onSubmit={async (data) => {
        await mutateAsync(data);
        navigate("/issues");
      }}
    />
  );
}