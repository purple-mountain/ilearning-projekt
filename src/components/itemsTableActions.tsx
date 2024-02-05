"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ItemColumnHeader, type ItemWithFieldsNames } from "~/lib/types";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function ItemsTableActions({ item }: { item: ItemWithFieldsNames | ItemColumnHeader }) {
    const router = useRouter();

    console.log(item);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleViewItem}>View Item</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEditItem(router)}>
                    Edit Item
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteItem(router)}>
                    Delete Item
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function handleViewItem() {
    console.log("view item");
}

function handleEditItem(router: AppRouterInstance) {
    console.log("edit item");
}

function handleDeleteItem(router: AppRouterInstance) {
    console.log("delete item");
}
