"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    createTask,
    getTasks,
} from "../services/tasks.service";

import type {
    CreateTaskInput,
    Task,
    TaskPriority,
} from "../types/task.types";

export type TaskTab =
    | "all"
    | "mine"
    | "overdue"
    | "completed";

export type PriorityFilter =
    | "all"
    | TaskPriority;

const PAGE_SIZE = 7;

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [tab, setTab] =
        useState<TaskTab>("all");

    const [search, setSearch] =
        useState("");

    const [priority, setPriority] =
        useState<PriorityFilter>("all");

    const [assignee, setAssignee] =
        useState("all");

    const [currentPage, setCurrentPage] =
        useState(1);

    useEffect(() => {
        async function loadTasks() {
            setLoading(true);

            const data = await getTasks();

            setTasks(data);
            setLoading(false);
        }

        void loadTasks();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        tab,
        search,
        priority,
        assignee,
    ]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            if (
                tab === "mine" &&
                task.assignee !== "David Miller"
            ) {
                return false;
            }

            if (
                tab === "overdue" &&
                !task.is_overdue
            ) {
                return false;
            }

            if (
                tab === "completed" &&
                task.status !== "done"
            ) {
                return false;
            }

            if (
                priority !== "all" &&
                task.priority !== priority
            ) {
                return false;
            }

            if (
                assignee !== "all" &&
                task.assignee !== assignee
            ) {
                return false;
            }

            const searchableText = [
                task.title,
                task.related_to,
                task.assignee,
            ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
                search.toLowerCase(),
            );
        });
    }, [
        tasks,
        tab,
        search,
        priority,
        assignee,
    ]);

    const totalRows = filteredTasks.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalRows / PAGE_SIZE),
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages,
    );

    const rows = filteredTasks.slice(
        (safeCurrentPage - 1) * PAGE_SIZE,
        safeCurrentPage * PAGE_SIZE,
    );

    const assignees = useMemo(
        () =>
            Array.from(
                new Set(
                    tasks.map(
                        (task) => task.assignee,
                    ),
                ),
            ).sort(),
        [tasks],
    );

    async function addTask(
        input: CreateTaskInput,
    ) {
        const newTask =
            await createTask(input);

        setTasks((current) => [
            newTask,
            ...current,
        ]);

        setTab("all");
        setCurrentPage(1);
    }

    function toggleTask(taskId: string) {
        setTasks((current) =>
            current.map((task) => {
                if (task.id !== taskId) {
                    return task;
                }

                return {
                    ...task,
                    status:
                        task.status === "done"
                            ? "todo"
                            : "done",
                };
            }),
        );
    }

    return {
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

        currentPage: safeCurrentPage,
        setCurrentPage,

        totalPages,
        totalRows,

        addTask,
        toggleTask,
    };
}
