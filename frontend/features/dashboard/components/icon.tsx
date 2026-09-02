import type { ReactNode } from "react";

export type IconName =
    | "activity"
    | "bell"
    | "calendar"
    | "cases"
    | "chat"
    | "check"
    | "chevron-down"
    | "customers"
    | "dashboard"
    | "dollar"
    | "filter"
    | "inbox"
    | "pipeline"
    | "plus"
    | "search"
    | "tasks"
    | "trend-up"
    | "users"
    | "zap";

type IconProps = {
    name: IconName;
    className?: string;
};

export default function Icon({
                                 name,
                                 className = "h-4 w-4",
                             }: IconProps) {
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    const paths: Record<IconName, ReactNode> = {
        activity: (
            <path {...common} d="M3 12h3l2-5 4 10 2-5h7" />
        ),

        bell: (
            <>
                <path
                    {...common}
                    d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                />
                <path {...common} d="M10 21h4" />
            </>
        ),

        calendar: (
            <>
                <rect
                    {...common}
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                />
                <path {...common} d="M16 3v4M8 3v4M3 10h18" />
            </>
        ),

        cases: (
            <>
                <circle {...common} cx="12" cy="12" r="9" />
                <path {...common} d="M12 8v4l2 2" />
            </>
        ),

        chat: (
            <path
                {...common}
                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
            />
        ),

        check: (
            <>
                <circle {...common} cx="12" cy="12" r="9" />
                <path {...common} d="m8 12 2.5 2.5L16 9" />
            </>
        ),

        "chevron-down": (
            <path {...common} d="m7 10 5 5 5-5" />
        ),

        customers: (
            <>
                <path
                    {...common}
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                />
                <circle {...common} cx="9" cy="7" r="4" />
                <path
                    {...common}
                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                />
            </>
        ),

        dashboard: (
            <>
                <path {...common} d="m3 11 9-8 9 8" />
                <path {...common} d="M5 10v10h14V10" />
            </>
        ),

        dollar: (
            <>
                <path {...common} d="M12 2v20" />
                <path
                    {...common}
                    d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                />
            </>
        ),

        filter: (
            <path {...common} d="M4 5h16l-6 7v5l-4 2v-7z" />
        ),

        inbox: (
            <>
                <rect
                    {...common}
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                />
                <path {...common} d="m3 7 9 7 9-7" />
            </>
        ),

        pipeline: (
            <>
                <path {...common} d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </>
        ),

        plus: (
            <path {...common} d="M12 5v14M5 12h14" />
        ),

        search: (
            <>
                <circle {...common} cx="11" cy="11" r="7" />
                <path {...common} d="m20 20-4-4" />
            </>
        ),

        tasks: (
            <>
                <rect
                    {...common}
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                />
                <path {...common} d="m8 12 2 2 5-5" />
            </>
        ),

        "trend-up": (
            <>
                <path {...common} d="m4 16 6-6 4 4 6-7" />
                <path {...common} d="M15 7h5v5" />
            </>
        ),

        users: (
            <>
                <circle {...common} cx="9" cy="8" r="3" />
                <path {...common} d="M3 20a6 6 0 0 1 12 0" />
                <path
                    {...common}
                    d="M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4.5"
                />
            </>
        ),

        zap: (
            <path {...common} d="m13 2-8 12h7l-1 8 8-12h-7z" />
        ),
    };

    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
        >
            {paths[name]}
        </svg>
    );
}