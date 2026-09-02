"use client";

import { useState } from "react";

import type {
    CreateCustomerInput,
    CustomerSource,
} from "../types/customer.types";

type AddCustomerModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (
        customer: CreateCustomerInput
    ) => Promise<void>;
};

export default function AddCustomerModal({
                                             open,
                                             onClose,
                                             onSubmit,
                                         }: AddCustomerModalProps) {
    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [companyName, setCompanyName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [source, setSource] =
        useState<CustomerSource>(
            "Manual Entry"
        );

    const [saving, setSaving] =
        useState(false);

    if (!open) {
        return null;
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (
            !firstName.trim() &&
            !companyName.trim()
        ) {
            return;
        }

        setSaving(true);

        await onSubmit({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            company_name:
                companyName.trim() || undefined,
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
            source,
        });

        setFirstName("");
        setLastName("");
        setCompanyName("");
        setEmail("");
        setPhone("");
        setSource("Manual Entry");

        setSaving(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 px-4">
            <div className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-extrabold text-[#202533]">
                            Add Customer
                        </h2>

                        <p className="mt-1 text-xs text-[#8b94a9]">
                            Create a new customer record.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-[#8b94a9]"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="text-xs font-semibold text-[#5f687e]">
                            First Name

                            <input
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(
                                        event.target.value
                                    )
                                }
                                className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] px-3 text-sm outline-none focus:border-[#4f6eff]"
                            />
                        </label>

                        <label className="text-xs font-semibold text-[#5f687e]">
                            Last Name

                            <input
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(
                                        event.target.value
                                    )
                                }
                                className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] px-3 text-sm outline-none focus:border-[#4f6eff]"
                            />
                        </label>
                    </div>

                    <label className="block text-xs font-semibold text-[#5f687e]">
                        Company

                        <input
                            value={companyName}
                            onChange={(event) =>
                                setCompanyName(
                                    event.target.value
                                )
                            }
                            className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] px-3 text-sm outline-none focus:border-[#4f6eff]"
                        />
                    </label>

                    <label className="block text-xs font-semibold text-[#5f687e]">
                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] px-3 text-sm outline-none focus:border-[#4f6eff]"
                        />
                    </label>

                    <label className="block text-xs font-semibold text-[#5f687e]">
                        Phone

                        <input
                            value={phone}
                            onChange={(event) =>
                                setPhone(event.target.value)
                            }
                            className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] px-3 text-sm outline-none focus:border-[#4f6eff]"
                        />
                    </label>

                    <label className="block text-xs font-semibold text-[#5f687e]">
                        Source

                        <select
                            value={source}
                            onChange={(event) =>
                                setSource(
                                    event.target
                                        .value as CustomerSource
                                )
                            }
                            className="mt-2 h-10 w-full rounded-xl border border-[#e0e5ef] bg-white px-3 text-sm outline-none focus:border-[#4f6eff]"
                        >
                            <option value="Manual Entry">
                                Manual Entry
                            </option>

                            <option value="WhatsApp">
                                WhatsApp
                            </option>

                            <option value="Website">
                                Website
                            </option>

                            <option value="Instagram">
                                Instagram
                            </option>

                            <option value="Facebook">
                                Facebook
                            </option>

                            <option value="CSV Import">
                                CSV Import
                            </option>

                            <option value="Physical Store">
                                Physical Store
                            </option>
                        </select>
                    </label>

                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-[#e0e5ef] px-5 py-2.5 text-xs font-semibold text-[#68728a]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-[#4f6eff] px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
                        >
                            {saving
                                ? "Adding..."
                                : "Add Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}