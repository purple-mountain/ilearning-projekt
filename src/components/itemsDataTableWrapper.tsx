"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
    type ItemWithFieldsNames,
    type CollectionWithItemAndField,
    type ItemColumnHeader,
} from "~/lib/types";
import { getItemHeaders } from "~/utils/getItemHeaders";
import { ItemsDataTable } from "./itemsDataTable";
import { getCustomFieldColumns } from "~/utils/getCustomFieldsColumns";
import { type Field } from "@prisma/client";
import { itemsTableColumns } from "~/data/itemsTableColumns";

type ItemsTableHeaders = ItemWithFieldsNames | ItemColumnHeader;

export function ItemsDataTableWrapper({ collection }: { collection: CollectionWithItemAndField }) {
    const itemsData: ItemsTableHeaders[] = getItemHeaders(collection);
    const columns: ColumnDef<ItemsTableHeaders>[] = getAllColumnHeaders(collection.field);

    return <ItemsDataTable columns={columns} data={itemsData} />;
}

const getAllColumnHeaders = (field: Field[]) =>
    itemsTableColumns
        .slice(0, 2)
        .concat(getCustomFieldColumns(field))
        .concat(itemsTableColumns.slice(2));
