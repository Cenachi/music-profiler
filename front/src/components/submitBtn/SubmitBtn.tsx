type SubmitBtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function SubmitBtn({ children, onClick }: SubmitBtnProps) {
  return (
    <button
      className="p-2 rounded-md border-black border-solid border-2 text-black bg-yellow-300 enabled:hover:border-yellow-300 enabled:hover:text-yellow-300 enabled:hover:bg-black  outline-none"
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
}
