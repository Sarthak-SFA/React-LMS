interface ButtonProps {
  caption: string;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  caption,
  type = 'submit',
  ...rest
}: ButtonProps) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25"
      type={type}
      onClick={rest.onClick}
      disabled={rest.disabled}
    >
      {caption}
    </button>
  );
}