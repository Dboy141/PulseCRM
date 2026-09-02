"use client";

import { useEffect, useMemo, useState } from "react";

import {
    createCustomer,
    getCustomers,
} from "../services/customers.service";

import type {
    CreateCustomerInput,
    Customer,
    CustomerSource,
    CustomerStatus,
} from "../types/customer.types";

import {
    adaptCustomerToTableRow,
    type CustomerTableRow,
} from "../utils/customer.adapter";

export type CustomerStatusFilter =
    | "all"
    | CustomerStatus;

export type CustomerSourceFilter =
    | "all"
    | CustomerSource;

export type CustomerCompanyFilter =
    | "all"
    | "individual"
    | "company";

export type CustomerArchiveFilter =
    | "active_only"
    | "include_archived"
    | "archived_only";

const PAGE_SIZE = 5;

export function useCustomers() {
    const [customers, setCustomers] =
        useState<Customer[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState<CustomerStatusFilter>("all");

    const [sourceFilter, setSourceFilter] =
        useState<CustomerSourceFilter>("all");

    const [companyFilter, setCompanyFilter] =
        useState<CustomerCompanyFilter>("all");

    const [archiveFilter, setArchiveFilter] =
        useState<CustomerArchiveFilter>(
            "active_only"
        );

    const [currentPage, setCurrentPage] =
        useState(1);

    useEffect(() => {
        async function loadCustomers() {
            setLoading(true);

            const data = await getCustomers();

            setCustomers(data);
            setLoading(false);
        }

        loadCustomers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery,
        statusFilter,
        sourceFilter,
        companyFilter,
        archiveFilter,
    ]);

    const filteredRows: CustomerTableRow[] =
        useMemo(() => {
            return customers
                .filter((customer) => {
                    if (
                        statusFilter !== "all" &&
                        customer.status !== statusFilter
                    ) {
                        return false;
                    }

                    if (
                        sourceFilter !== "all" &&
                        customer.source !== sourceFilter
                    ) {
                        return false;
                    }

                    if (
                        companyFilter === "company" &&
                        !customer.company_name
                    ) {
                        return false;
                    }

                    if (
                        companyFilter === "individual" &&
                        customer.company_name
                    ) {
                        return false;
                    }

                    if (
                        archiveFilter === "active_only" &&
                        customer.status === "archived"
                    ) {
                        return false;
                    }

                    if (
                        archiveFilter === "archived_only" &&
                        customer.status !== "archived"
                    ) {
                        return false;
                    }

                    const searchText = [
                        customer.first_name,
                        customer.last_name,
                        customer.company_name,
                        customer.email,
                        customer.phone,
                        customer.owner_name,
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    return searchText.includes(
                        searchQuery.toLowerCase()
                    );
                })
                .map(adaptCustomerToTableRow);
        }, [
            customers,
            searchQuery,
            statusFilter,
            sourceFilter,
            companyFilter,
            archiveFilter,
        ]);

    const totalRows = filteredRows.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalRows / PAGE_SIZE)
    );

    const rows = filteredRows.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    async function addCustomer(
        input: CreateCustomerInput
    ) {
        const createdCustomer =
            await createCustomer(input);

        setCustomers((current) => [
            createdCustomer,
            ...current,
        ]);

        setCurrentPage(1);
    }

    return {
        rows,
        loading,

        searchQuery,
        setSearchQuery,

        statusFilter,
        setStatusFilter,

        sourceFilter,
        setSourceFilter,

        companyFilter,
        setCompanyFilter,

        archiveFilter,
        setArchiveFilter,

        currentPage,
        setCurrentPage,
        totalPages,
        totalRows,

        addCustomer,
    };
}