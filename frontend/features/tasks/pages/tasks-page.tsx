"use client";

import { useState } from "react";

import Icon from "../../dashboard/components/icon";
import Sidebar from "../../dashboard/components/sidebar";

import AddTaskModal from "../components/add-task-modal";
import TaskStats from "../components/task-stats";
import TaskTable from "../components/task-table";
import TaskToolbar from "../components/task-toolbar";

import { useTasks } from "../hooks/use-tasks";

export default function TasksPage() {
    const [showAddTask, setShowAddTask] =
        useState(false);

    const {
        rows,
        loading,

        tab,
        setTab,

        search,
        setSearch,

        priority,
        setPriority,

        assignee,
        setAssignee,
        assignees,

        currentPage,
        setCurrentPage,

        totalPages,
        totalRows,

        addTask,
        toggleTask,
    } = useTasks();

    const startRow =
        totalRows === 0
            ? 0
            : (currentPage - 1) * 7 + 1;

    const endRow = Math.min(
        currentPage * 7,
        totalRows,
    );

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-[#202533]">
            <div className="xl:grid xl:grid-cols-[206px_minmax(0,1fr)]">
                <Sidebar activeItem="Tasks" />

                <section className="min-w-0 px-5 pb-8 pt-5 sm:px-6">
                    <header className="flex items-center justify-between gap-5">
                        <label className="flex h-10 w-full max-w-[360px] items-center gap-2 rounded-xl border border-[#e0e5ef] bg-white px-4 text-[#8b94aa]">
                            <Icon
                                name="search"
                                className="h-4 w-4"
                            />

                            <input
                                type="search"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target
                                            .value,
                                    )
                                }
                                className="w-full bg-transparent text-sm text-[#252a39] outline-none placeholder:text-[#9aa2b6]"
                            />
                        </label>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#e0e5ef] bg-white text-[#65708a]"
                            >
                                <Icon
                                    name="bell"
                                    className="h-[17px] w-[17px]"
                                />

                                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e83d63] px-1 text-[9px] font-bold text-white">
                                    3
                                </span>
                            </button>

                            <div className="ml-1 flex items-center gap-2.5">
                                <div
                                    className="h-10 w-10 rounded-full"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#f297c4,#755cff)",
                                    }}
                                />

                                <div className="hidden leading-tight sm:block">
                                    <p className="text-xs font-bold text-[#232836]">
                                        David Miller
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-[#8992a9]">
                                        Sales manager
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-extrabold tracking-[-0.04em] text-[#202533]">
                                Tasks
                            </h1>

                            <p className="mt-1 text-xs text-[#7e879d]">
                                Follow-ups, reminders,
                                and action items across
                                your team.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowAddTask(true)
                            }
                            className="flex items-center gap-2 self-start rounded-xl bg-[#4f6eff] px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(79,110,255,0.2)]"
                        >
                            <Icon
                                name="plus"
                                className="h-4 w-4"
                            />

                            New Task
                        </button>
                    </div>

                    <div className="mt-6">
                        <TaskStats />
                    </div>

                    <div className="mt-6">
                        <TaskToolbar
                            tab={tab}
                            onTabChange={setTab}
                            search={search}
                            onSearchChange={
                                setSearch
                            }
                            priority={priority}
                            onPriorityChange={
                                setPriority
                            }
                            assignee={assignee}
                            onAssigneeChange={
                                setAssignee
                            }
                            assignees={assignees}
                        />
                    </div>

                    <div className="mt-5">
                        <TaskTable
                            rows={rows}
                            loading={loading}
                            onToggleTask={
                                toggleTask
                            }
                        />
                    </div>

                    {!loading && (
                        <div className="mt-4 flex flex-col gap-3 text-xs text-[#8992a7] sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                Showing {startRow}–
                                {endRow} of{" "}
                                {totalRows} tasks
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={
                                        currentPage <=
                                        1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage -
                                                1,
                                        )
                                    }
                                    className="rounded-lg border border-[#dfe3ec] bg-white px-3 py-2 font-semibold text-[#657087] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                {Array.from(
                                    {
                                        length: totalPages,
                                    },
                                    (_, index) =>
                                        index + 1,
                                ).map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage(
                                                page,
                                            )
                                        }
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                                            currentPage ===
                                            page
                                                ? "bg-[#4f6eff] text-white"
                                                : "border border-[#dfe3ec] bg-white text-[#657087]"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    disabled={
                                        currentPage >=
                                        totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage +
                                                1,
                                        )
                                    }
                                    className="rounded-lg border border-[#dfe3ec] bg-white px-3 py-2 font-semibold text-[#657087] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <AddTaskModal
                open={showAddTask}
                onClose={() =>
                    setShowAddTask(false)
                }
                onSubmit={addTask}
            />
        </main>
    );
}
