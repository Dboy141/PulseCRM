import type { DashboardRole } from "../types/dashboard.types";

type RoleSwitcherProps = {
    value: DashboardRole;
    onChange: (role: DashboardRole) => void;
};

const roles: DashboardRole[] = [
    "CEO",
    "CRM Admin",
    "Sales Representative",
    "Inbox Agent",
];

export default function RoleSwitcher({
                                         value,
                                         onChange,
                                     }: RoleSwitcherProps) {
    return (
        <select
            value={value}
            onChange={(event) =>
                onChange(event.target.value as DashboardRole)
            }
            aria-label="Preview dashboard role"
            className="rounded-xl border border-[#e0e5ef] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#68728a] outline-none"
        >
            {roles.map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}