import { tasksMock } from "../data/tasks.mock";
import type {
    CreateTaskInput,
    Task,
} from "../types/task.types";

export async function getTasks(): Promise<Task[]> {
    return [...tasksMock];
}

export async function createTask(
    input: CreateTaskInput,
): Promise<Task> {
    return {
        id: `task_${Date.now()}`,
        title: input.title,
        related_to: input.related_to,
        assignee: input.assignee,
        priority: input.priority,
        due_date: input.due_date,
        due_label: input.due_date,
        status: "todo",
        is_overdue: false,
        is_due_today: false,
    };
}
