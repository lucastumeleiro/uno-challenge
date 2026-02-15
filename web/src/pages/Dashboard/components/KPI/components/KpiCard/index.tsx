function KpiCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="border border-neutral-light rounded-lg p-4">
      <p className="text-sm text-neutral-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-neutral-dark">
          {value}
        </span>
        {subtitle && (
          <span className="text-xs text-neutral-medium">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

export { KpiCard };
