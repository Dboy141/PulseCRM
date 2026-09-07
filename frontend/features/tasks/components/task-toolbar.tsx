import Icon from "../../dashboard/components/icon";

import type {
    PriorityFilter,
    TaskTab,
} from "../hooks/use-tasks";

type TaskToolbarProps = {
    tab: TaskTab;
    onTabChange: (tab: TaskTab) => void;

    search: string;
    onSearchChange: (value: string) => void;

    priority: PriorityFilter;
    onPriorityChange: (
        value: PriorityFilter,
    ) => void;

    assignee: string;
    onAssigneeChange: (
        value: string,
    ) => void;

    assignees: string[];
};

const tabs: Array<{
    label: string;
    value: TaskTab;
}> = [
    {
        label: "All Tasks",
        value: "all",
    },
    {
        label: "My Tasks",
        value: "mine",
    },
    {
        label: "Overdue",
        value: "overdue",
    },
    {
        label: "Completed",
        value: "completed",
    },
];

export default function TaskToolbar({
    tab,
    onTabChange,
    search,
    onSearchChange,
    priority,
    onPriorityChange,
    assignee,
    onAssigneeChange,
    assignees,
}: TaskToolbarProps) {
    function exportTasks() {
        window.print();
    }

    return (
        <div>
            <div className="inline-flex rounded-xl border border-[#e1e5ee] bg-white p-1">
                {tabs.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                            onTabChange(item.value)
                        }
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                            tab === item.value
                                ? "bg-[#eef1ff] text-[#4f6eff]"
                                : "text-[#7c859b] hover:bg-[#f7f8fc]"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
                <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-3 text-[#8b94aa]">
                    <Icon
                        name="search"
                        className="h-4 w-4"
                    />

                    <input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(
                                event.target.value,
                            )
                        }
                        type="search"
                        placeholder="Search tasks..."
                        className="w-full bg-transparent text-xs text-[#252a39] outline-none placeholder:text-[#9aa2b6]"
                    />
                </label>

                <select
                    value={priority}
                    onChange={(event) =>
                        onPriorityChange(
                            event.target
                                .value as PriorityFilter,
                        )
                    }
                    className="h-10 rounded-xl border border-[#e0e5ef] bg-white px-3 text-xs font-medium text-[#616b82] outline-none"
                >
                    <option value="all">
                        All priorities
                    </option>
                    <option value="high">
                        High priority
                    </option>
                    <option value="medium">
                        Medium priority
                    </option>
                    <option value="low">
                        Low priority
                    </option>
                </select>

                <select
                    value={assignee}
                    onChange={(event) =>
                        onAssigneeChange(
                            event.target.value,
                        )
                    }
                    className="h-10 rounded-xl border border-[#e0e5ef] bg-white px-3 text-xs font-medium text-[#616b82] outline-none"
                >
                    <option value="all">
                        All assignees
                    </option>

                    {assignees.map((name) => (
                        <option
                            key={name}
                            value={name}
                        >
                            {name}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={exportTasks}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-4 text-xs font-semibold text-[#59647c] hover:bg-[#f8f9fc]"
                >
                    Export
                </button>
            </div>
        </div>
    );
}
