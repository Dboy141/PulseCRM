import type {
    Task,
    TaskPriority,
    TaskStatus,
} from "../types/task.types";

type TaskTableProps = {
    rows: Task[];
    loading: boolean;
    onToggleTask: (taskId: string) => void;
};

function PriorityBadge({
    priority,
}: {
    priority: TaskPriority;
}) {
    const styles = {
        high: "bg-[#fff0f2] text-[#e94d66]",
        medium:
            "bg-[#fff7e8] text-[#d98a16]",
        low: "bg-[#eef8f4] text-[#24a17b]",
    };

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${styles[priority]}`}
        >
            {priority}
        </span>
    );
}

function StatusBadge({
    status,
}: {
    status: TaskStatus;
}) {
    if (status === "done") {
        return (
            <span className="inline-flex rounded-full bg-[#eaf8f2] px-2.5 py-1 text-[10px] font-bold text-[#16a278]">
                Done
            </span>
        );
    }

    if (status === "in_progress") {
        return (
            <span className="inline-flex rounded-full bg-[#edf0ff] px-2.5 py-1 text-[10px] font-bold text-[#536dfe]">
                In Progress
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-[#f1f3f7] px-2.5 py-1 text-[10px] font-bold text-[#687288]">
            To Do
        </span>
    );
}

export default function TaskTable({
    rows,
    loading,
    onToggleTask,
}: TaskTableProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#e1e5ee] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse">
                    <thead>
                        <tr className="border-b border-[#edf0f5] bg-[#fafbfc] text-left">
                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8992a7]">
                                Task
                            </th>

                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8992a7]">
                                Related To
                            </th>

                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8992a7]">
                                Priority
                            </th>

                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8992a7]">
                                Due Date
                            </th>

                            <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8992a7]">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-12 text-center text-sm text-[#8b94a8]"
                                >
                                    Loading tasks...
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-5 py-12 text-center text-sm text-[#8b94a8]"
                                >
                                    No tasks found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b border-[#f0f2f6] last:border-b-0 hover:bg-[#fbfcfe]"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-start gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onToggleTask(
                                                        task.id,
                                                    )
                                                }
                                                aria-label={
                                                    task.status ===
                                                    "done"
                                                        ? "Mark task incomplete"
                                                        : "Mark task complete"
                                                }
                                                className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                                                    task.status ===
                                                    "done"
                                                        ? "border-[#4f6eff] bg-[#4f6eff] text-white"
                                                        : "border-[#cbd1dc] bg-white"
                                                }`}
                                            >
                                                {task.status ===
                                                "done" ? (
                                                    <span className="text-[10px]">
                                                        ✓
                                                    </span>
                                                ) : null}
                                            </button>

                                            <div>
                                                <p
                                                    className={`text-xs font-semibold ${
                                                        task.status ===
                                                        "done"
                                                            ? "text-[#9aa2b5] line-through"
                                                            : "text-[#2a3040]"
                                                    }`}
                                                >
                                                    {
                                                        task.title
                                                    }
                                                </p>

                                                <p className="mt-1 text-[10px] text-[#a0a7b7]">
                                                    Assigned to{" "}
                                                    {
                                                        task.assignee
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            className="text-xs font-medium text-[#5068df] hover:underline"
                                        >
                                            {
                                                task.related_to
                                            }
                                        </button>
                                    </td>

                                    <td className="px-5 py-4">
                                        <PriorityBadge
                                            priority={
                                                task.priority
                                            }
                                        />
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`text-xs font-medium ${
                                                task.is_overdue
                                                    ? "text-[#e94d66]"
                                                    : task.is_due_today
                                                      ? "text-[#d98715]"
                                                      : "text-[#646e84]"
                                            }`}
                                        >
                                            {task.is_overdue
                                                ? `Overdue · ${task.due_label}`
                                                : task.due_label}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge
                                            status={
                                                task.status
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
