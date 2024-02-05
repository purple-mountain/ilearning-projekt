import { ItemWithFieldsNames, type CollectionWithItemAndField } from "~/lib/types";

export function formatDate(date: Date): string {
    return date.toLocaleDateString("default", {
        minute: "2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hourCycle: "h24",
    });
}

export const getItemHeaders = (collection: CollectionWithItemAndField) =>
    collection.items.map((item) => ({
        name: item.name,
        ...collection.field
            .map((fld) => {
                const fldv = item.fieldValue.find((fldv) => fldv.fieldId === fld.id)?.value;
                const dateFldv = fld.fieldType === "date" && Date.parse(fldv!);
                return {
                    [fld.fieldName]: !dateFldv ? fldv : formatDate(new Date(dateFldv)),
                };
            })
            ?.reduce((obj, f) => {
                const [key, value] = Object.entries(f)[0]!;
                obj[key] = value;
                return obj;
            }, {}),
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
    }));
