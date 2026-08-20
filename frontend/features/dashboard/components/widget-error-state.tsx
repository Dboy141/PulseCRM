type WidgetErrorStateProps = {
    title?: string;
    message?: string;
};

export default function WidgetErrorState({
                                             title = "Unable to load dashboard",
                                             message = "Something went wrong while loading this information.",
                                         }: WidgetErrorStateProps) {
    return (
        <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h3 className="text-base font-semibold text-red-600">
                {title}
            </h3>

            <p className="mt-2 text-sm text-pulse-muted">
                {message}
            </p>
        </div>
    );
}