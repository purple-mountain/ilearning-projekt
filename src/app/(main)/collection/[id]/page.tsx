import { PrismaClient } from "@prisma/client";
import { CollectionHeader } from "~/components/collectionHeader";
import { ItemsDataTable } from "~/components/itemsDataTable";
import { type ColumnDef } from "@tanstack/react-table";
import { type ItemColumnHeader, type ItemWithFieldsNames } from "~/lib/types";
import { getItemHeaders } from "~/utils/getItemHeaders";
import { getColumns } from "~/utils/getColumns";

const prisma = new PrismaClient();

type ItemHeaders = ItemWithFieldsNames | ItemColumnHeader;

async function getCollection(id: string) {
    const parsedId = parseInt(id);
    if (!parsedId) return null;
    return await prisma.collection.findUnique({
        where: {
            id: parsedId,
        },
        include: {
            items: {
                include: {
                    fieldValue: true,
                },
            },
            field: true,
        },
    });
}

export default async function Collection({ params: { id } }: { params: { id: string } }) {
    const collection = await getCollection(id);

    if (collection === null) {
        return <p>Not found</p>;
    }

    const itemsData: ItemHeaders[] = getItemHeaders(collection);
    const columns: ColumnDef<ItemHeaders>[] = getColumns(collection.field);

    return (
        <>
            <CollectionHeader collection={collection} />
            <ItemsDataTable columns={columns} data={itemsData} />
        </>
    );
}
