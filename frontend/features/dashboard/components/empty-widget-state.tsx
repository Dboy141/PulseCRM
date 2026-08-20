type EmptyWidgetStateProps = {
    title: string;
    message: string;
};

export default function EmptyWidgetState({
                                             title,
                                             message,
                                         }: EmptyWidgetStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-pulse-line bg-white p-8 text-center">
            <h3 className="text-base font-semibold text-pulse-ink">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-pulse-muted">
                {message}
            </p>
        </div>
    );
}