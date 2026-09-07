"use client";

import {
    FormEvent,
    useState,
} from "react";

import type {
    CreateTaskInput,
    TaskPriority,
} from "../types/task.types";

type AddTaskModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (
        input: CreateTaskInput,
    ) => Promise<void>;
};

export default function AddTaskModal({
    open,
    onClose,
    onSubmit,
}: AddTaskModalProps) {
    const [title, setTitle] = useState("");
    const [relatedTo, setRelatedTo] =
        useState("");
    const [assignee, setAssignee] =
        useState("David Miller");
    const [priority, setPriority] =
        useState<TaskPriority>("medium");
    const [dueDate, setDueDate] =
        useState("");

    if (!open) {
        return null;
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        await onSubmit({
            title: title.trim(),
            related_to:
                relatedTo.trim() || "Unlinked",
            assignee,
            priority,
            due_date:
                dueDate || "No due date",
        });

        setTitle("");
        setRelatedTo("");
        setAssignee("David Miller");
        setPriority("medium");
        setDueDate("");

        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b2130]/35 px-4">
            <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-extrabold text-[#202533]">
                            New Task
                        </h2>

                        <p className="mt-1 text-xs text-[#8a93a8]">
                            Create a new follow-up or
                            action item.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f5f9] text-[#667085]"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >
                    <label className="block">
                        <span className="text-xs font-semibold text-[#555f75]">
                            Task title
                        </span>

                        <input
                            required
                            value={title}
                            onChange={(event) =>
                                setTitle(
                                    event.target.value,
                                )
                            }
                            placeholder="Enter task title"
                            className="mt-2 h-10 w-full rounded-xl border border-[#dde2eb] px-3 text-sm outline-none focus:border-[#7185ff]"
                        />
                    </label>

                    <label className="block">
                        <span className="text-xs font-semibold text-[#555f75]">
                            Related to
                        </span>

                        <input
                            value={relatedTo}
                            onChange={(event) =>
                                setRelatedTo(
                                    event.target.value,
                                )
                            }
                            placeholder="Customer or company"
                            className="mt-2 h-10 w-full rounded-xl border border-[#dde2eb] px-3 text-sm outline-none focus:border-[#7185ff]"
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label>
                            <span className="text-xs font-semibold text-[#555f75]">
                                Assignee
                            </span>

                            <select
                                value={assignee}
                                onChange={(event) =>
                                    setAssignee(
                                        event.target
                                            .value,
                                    )
                                }
                                className="mt-2 h-10 w-full rounded-xl border border-[#dde2eb] bg-white px-3 text-sm outline-none"
                            >
                                <option>
                                    David Miller
                                </option>
                                <option>
                                    Sarah Johnson
                                </option>
                                <option>
                                    Progress Attat
                                </option>
                            </select>
                        </label>

                        <label>
                            <span className="text-xs font-semibold text-[#555f75]">
                                Priority
                            </span>

                            <select
                                value={priority}
                                onChange={(event) =>
                                    setPriority(
                                        event.target
                                            .value as TaskPriority,
                                    )
                                }
                                className="mt-2 h-10 w-full rounded-xl border border-[#dde2eb] bg-white px-3 text-sm outline-none"
                            >
                                <option value="low">
                                    Low
                                </option>
                                <option value="medium">
                                    Medium
                                </option>
                                <option value="high">
                                    High
                                </option>
                            </select>
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-xs font-semibold text-[#555f75]">
                            Due date
                        </span>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(event) =>
                                setDueDate(
                                    event.target.value,
                                )
                            }
                            className="mt-2 h-10 w-full rounded-xl border border-[#dde2eb] px-3 text-sm outline-none"
                        />
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-[#dde2eb] px-4 py-2.5 text-xs font-bold text-[#626c82]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-[#4f6eff] px-5 py-2.5 text-xs font-bold text-white"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
