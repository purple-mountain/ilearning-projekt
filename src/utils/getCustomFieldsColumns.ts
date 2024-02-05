import { type Field } from "@prisma/client";
import { capitalize } from "./capitalize";

export function getCustomFieldColumns(field: Field[]) {
    return field.map((fld) => ({
        accessorKey: fld.fieldName,
        header: capitalize(fld.fieldName),
    }));
}
