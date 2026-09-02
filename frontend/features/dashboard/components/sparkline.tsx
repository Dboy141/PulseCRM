type SparklineProps = {
    values: number[];
    color: string;
    className?: string;
};

export default function Sparkline({
                                      values,
                                      color,
                                      className = "h-10 w-full",
                                  }: SparklineProps) {
    const width = 180;
    const height = 36;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values
        .map((value, index) => {
            const x =
                (index / (values.length - 1)) * width;

            const y =
                height -
                ((value - min) / range) *
                (height - 6) -
                3;

            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className={className}
            aria-hidden="true"
        >
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}