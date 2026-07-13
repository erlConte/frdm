"use client";

export function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => void;
  confirmMessage: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-600 hover:underline cursor-pointer">
        Elimina
      </button>
    </form>
  );
}
