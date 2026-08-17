export default function WidgetSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl border border-pulse-line bg-white p-6">
            <div className="h-5 w-40 rounded bg-pulse-line" />

            <div className="mt-3 h-3 w-64 max-w-full rounded bg-pulse-line" />

            <div className="mt-7 space-y-4">
                <div className="h-12 rounded-xl bg-pulse-wash" />
                <div className="h-12 rounded-xl bg-pulse-wash" />
                <div className="h-12 rounded-xl bg-pulse-wash" />
            </div>
        </div>
    );
}