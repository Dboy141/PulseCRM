"use client";

import { useState } from "react";

import Sidebar from "../../dashboard/components/sidebar";
import TopHeader from "../../dashboard/components/top-header";
import Icon from "../../dashboard/components/icon";

import AddCustomerModal from "../components/add-customer-modal";
import CustomerPagination from "../components/customer-pagination";
import CustomerTable from "../components/customer-table";
import CustomerToolbar from "../components/customer-toolbar";

import { useCustomers } from "../hooks/use-customers";

export default function CustomersPage() {
    const [showAddCustomer, setShowAddCustomer] =
        useState(false);

    const {
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
    } = useCustomers();

    return (
        <main className="min-h-screen bg-[#f7f8fc] text-[#202533]">
            <div className="xl:grid xl:grid-cols-[206px_minmax(0,1fr)]">
                <Sidebar activeItem="Customers" />

                <section className="min-w-0 px-5 pb-8 pt-5 sm:px-6">
                    <TopHeader />

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-[28px] font-extrabold tracking-[-0.04em] text-[#202533]">
                                Customers
                            </h1>

                            <p className="mt-1 text-xs text-[#7e879d]">
                                Manage customer profiles,
                                identities and relationships.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowAddCustomer(true)
                            }
                            className="flex items-center gap-2 self-start rounded-xl bg-[#4f6eff] px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_18px_rgba(79,110,255,0.2)]"
                        >
                            <Icon
                                name="plus"
                                className="h-4 w-4"
                            />

                            Add Customer
                        </button>
                    </div>

                    <div className="mt-6">
                        <CustomerToolbar
                            searchQuery={searchQuery}
                            onSearchChange={
                                setSearchQuery
                            }
                            statusFilter={statusFilter}
                            onStatusChange={
                                setStatusFilter
                            }
                            sourceFilter={sourceFilter}
                            onSourceChange={
                                setSourceFilter
                            }
                            companyFilter={
                                companyFilter
                            }
                            onCompanyChange={
                                setCompanyFilter
                            }
                            archiveFilter={
                                archiveFilter
                            }
                            onArchiveChange={
                                setArchiveFilter
                            }
                        />
                    </div>

                    <div className="mt-5">
                        <CustomerTable
                            rows={rows}
                            loading={loading}
                        />

                        {!loading && (
                            <CustomerPagination
                                currentPage={
                                    currentPage
                                }
                                totalPages={
                                    totalPages
                                }
                                totalRows={totalRows}
                                onPageChange={
                                    setCurrentPage
                                }
                            />
                        )}
                    </div>
                </section>
            </div>

            <AddCustomerModal
                open={showAddCustomer}
                onClose={() =>
                    setShowAddCustomer(false)
                }
                onSubmit={addCustomer}
            />
        </main>
    );
}