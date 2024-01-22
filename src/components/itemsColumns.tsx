"use client";

import { type ColumnDef } from "@tanstack/react-table";

// TODO: Transform FieldColumns array into { [FieldName]: string }
// Try doing the old regular way (with array of fieldName) and just adapt the header and data part
// it should also satistify the getData func but might require a bit of vodoo

export type Item = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<Item>[] = [
    {
        accessorKey: "id",
        header: "id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "CreatedAt",
    },
    {
        accessorKey: "updatedAt",
        header: "UpdatedAt",
    },
];
