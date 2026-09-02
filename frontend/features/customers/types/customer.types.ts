export type CustomerSource =
    | "WhatsApp"
    | "Website"
    | "Instagram"
    | "CSV Import"
    | "Facebook"
    | "Physical Store"
    | "Manual Entry";

export type CustomerStatus =
    | "active"
    | "new"
    | "archived"
    | "identity_review"
    | "possible_duplicate";

export type Customer = {
    id: string;
    first_name: string;
    last_name: string;
    company_name?: string;
    email?: string;
    phone?: string;
    source: CustomerSource;
    status: CustomerStatus;
    owner_name: string;
    last_activity_at: string;
    last_activity_type: string;
};

export type CreateCustomerInput = {
    first_name: string;
    last_name: string;
    company_name?: string;
    email?: string;
    phone?: string;
    source: CustomerSource;
};