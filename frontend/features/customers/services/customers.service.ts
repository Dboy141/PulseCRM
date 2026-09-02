import { customers } from "../data/customers.mock";
import type {
    CreateCustomerInput,
    Customer,
} from "../types/customer.types";

export async function getCustomers(): Promise<Customer[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...customers]);
        }, 300);
    });
}

export async function createCustomer(
    input: CreateCustomerInput
): Promise<Customer> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: `cus_${Date.now()}`,
                first_name: input.first_name,
                last_name: input.last_name,
                company_name: input.company_name,
                email: input.email,
                phone: input.phone,
                source: input.source,
                status: "new",
                owner_name: "David Miller",
                last_activity_at: "Just now",
                last_activity_type: "Manual creation",
            });
        }, 250);
    });
}