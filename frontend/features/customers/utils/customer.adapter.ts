import type { Customer } from "../types/customer.types";

export type CustomerTableRow = {
    id: string;
    displayName: string;
    initials: string;
    email: string;
    phone: string;
    source: Customer["source"];
    statusLabel: string;
    status: Customer["status"];
    ownerName: string;
    lastActivity: string;
    lastActivityType: string;
};

function getDisplayName(customer: Customer) {
    if (customer.company_name) {
        return customer.company_name;
    }

    return `${customer.first_name} ${customer.last_name}`.trim();
}

function getInitials(customer: Customer) {
    if (customer.company_name) {
        return customer.company_name
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }

    return `${customer.first_name[0] ?? ""}${customer.last_name[0] ?? ""}`.toUpperCase();
}

function getStatusLabel(status: Customer["status"]) {
    const labels: Record<Customer["status"], string> = {
        active: "Active",
        new: "New",
        archived: "Archived",
        identity_review: "Identity Review",
        possible_duplicate: "Possible Duplicate",
    };

    return labels[status];
}

export function adaptCustomerToTableRow(
    customer: Customer
): CustomerTableRow {
    return {
        id: customer.id,
        displayName: getDisplayName(customer),
        initials: getInitials(customer),
        email: customer.email ?? "—",
        phone: customer.phone ?? "—",
        source: customer.source,
        statusLabel: getStatusLabel(customer.status),
        status: customer.status,
        ownerName: customer.owner_name,
        lastActivity: customer.last_activity_at,
        lastActivityType: customer.last_activity_type,
    };
}