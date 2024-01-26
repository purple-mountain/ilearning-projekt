import { type Field } from "@prisma/client";
import { capitalize } from "./capitalize";

export function getColumns(field: Field[]) {
  return [
        {

            accessorKey: "name",
            header: "Name",
        },
        ...field.map((fld) => ({
            accessorKey: fld.fieldName,
            header: capitalize(fld.fieldName),
        })),
        {
            accessorKey: "createdAt",
            header: "CreatedAt",
        },
        {
            accessorKey: "updatedAt",
            header: "UpdatedAt",
        },
    ];
}
