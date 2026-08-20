import type { DashboardRole } from "../types/dashboard.types";

type RoleSwitcherProps = {
    selectedRole: DashboardRole;
    onRoleChange: (
        role: DashboardRole
    ) => void;
};

const roles: DashboardRole[] = [
    "CEO",
    "CRM Admin",
    "Sales Representative",
    "Inbox Agent",
];

export default function RoleSwitcher({
                                         selectedRole,
                                         onRoleChange,
                                     }: RoleSwitcherProps) {
    return (
        <div className="max-w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-pulse-muted">
                Development role preview
            </p>

            <div className="flex max-w-full flex-wrap gap-2">
                {roles.map((role) => (
                    <button
                        key={role}
                        type="button"
                        onClick={() =>
                            onRoleChange(role)
                        }
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                            selectedRole === role
                                ? "border-pulse-teal bg-pulse-teal text-white"
                                : "border-pulse-line bg-white text-pulse-muted hover:border-pulse-teal hover:text-pulse-ink"
                        }`}
                    >
                        {role}
                    </button>
                ))}
            </div>
        </div>
    );
}