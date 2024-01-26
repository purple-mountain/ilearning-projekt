import { type CollectionWithItemAndField } from "~/lib/types";

export function formatDate(date: Date): string {
    return date.toLocaleDateString("default", {
        minute: "2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}

export const getItemHeaders = (collection: CollectionWithItemAndField) =>
    collection.items.map((item) => ({
        name: item.name,
        ...collection.field.map((fld) => ({ [fld.fieldName]: item.fieldValue })),
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
    }));
