type MetricCardProps = {
    label: string;
    value: string;
    helper?: string;
};

export default function MetricCard({
                                       label,
                                       value,
                                       helper,
                                   }: MetricCardProps) {
    return (
        <div className="rounded-2xl border border-pulse-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm font-medium text-pulse-muted">
                {label}
            </p>

            <p className="mt-3 text-2xl font-bold tracking-tight text-pulse-ink sm:text-3xl">
                {value}
            </p>

            {helper && (
                <p className="mt-2 text-xs leading-5 text-pulse-muted">
                    {helper}
                </p>
            )}
        </div>
    );
}