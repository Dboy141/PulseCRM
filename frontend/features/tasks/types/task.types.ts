export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus =
    | "todo"
    | "in_progress"
    | "done";

export type Task = {
    id: string;
    title: string;
    related_to: string;
    assignee: string;
    priority: TaskPriority;
    due_date: string;
    due_label: string;
    status: TaskStatus;
    is_overdue: boolean;
    is_due_today: boolean;
};

export type CreateTaskInput = {
    title: string;
    related_to: string;
    assignee: string;
    priority: TaskPriority;
    due_date: string;
};
