"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type ItemColumnHeader, type ItemWithFieldsNames } from "~/lib/types";
import { ItemsTableActions } from "~/components/itemsTableActions";

export const itemsTableColumns: ColumnDef<ItemWithFieldsNames | ItemColumnHeader>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            const item = row.original;

            return <ItemsTableActions item={item} />;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
    },
];
