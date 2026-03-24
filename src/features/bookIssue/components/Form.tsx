import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: Master.IssueItem) => Promise<void>;
  submitCaption: string;
}

export default function Form({ onSubmit, submitCaption }: Props) {
  const { register, handleSubmit } = useForm<Master.IssueItem>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register("bookId")} placeholder="Book ID" />
      <input {...register("memberId")} placeholder="Member ID" />
      <input type="date" {...register("issueDate")} />
      <input type="date" {...register("returnDate")} />

      <button>{submitCaption}</button>
    </form>
  );
}