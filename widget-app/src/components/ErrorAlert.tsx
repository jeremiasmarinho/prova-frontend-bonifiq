export function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="p-3 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm
                    dark:bg-red-900/30 dark:border-red-800 dark:text-red-300"
    >
      {message}
    </div>
  );
}
