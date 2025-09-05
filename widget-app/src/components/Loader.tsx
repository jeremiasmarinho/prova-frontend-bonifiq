export function Loader() {
  return (
    <div className="animate-pulse space-y-3" data-testid="loader">
      <div className="h-3 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );
}
