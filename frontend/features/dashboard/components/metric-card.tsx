import Icon from "./icon";
import Sparkline from "./sparkline";

type MetricCardProps = {
    label: string;
    value: string;
    change: string;
    helper: string;
    icon: "dollar" | "trend-up" | "check";
    iconColor: string;
    iconBg: string;
    sparkColor: string;
    spark: number[];
};

export default function MetricCard({
                                       label,
                                       value,
                                       change,
                                       helper,
                                       icon,
                                       iconColor,
                                       iconBg,
                                       sparkColor,
                                       spark,
                                   }: MetricCardProps) {
    return (
        <article className="rounded-2xl border border-[#e1e6ef] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: iconBg,
                        color: iconColor,
                    }}
                >
                    <Icon
                        name={icon}
                        className="h-[18px] w-[18px]"
                    />
                </div>

                <p className="text-xs font-semibold text-[#69728b]">
                    {label}
                </p>
            </div>

            <p className="mt-4 text-[24px] font-extrabold leading-none tracking-[-0.03em] text-[#202533]">
                {value}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-[11px]">
        <span className="font-bold text-[#0fa47a]">
          ▲ {change}
        </span>

                <span className="text-[#9aa2b4]">
          {helper}
        </span>
            </div>

            <Sparkline
                values={spark}
                color={sparkColor}
                className="mt-2.5 h-8 w-full"
            />
        </article>
    );
}