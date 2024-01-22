import { PrismaClient } from "@prisma/client";
import { CollectionHeader } from "~/components/collectionHeader";
import { ItemsDataTable } from "~/components/itemsDataTable";
import { use } from "react";
import { columns, type Item } from "~/components/itemsColumns";

const prisma = new PrismaClient();

async function getCollection(name: string) {
    return await prisma.collection.findFirstOrThrow({
        where: {
            name: name,
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

export default function Collection({
    params: { name },
}: {
    params: { name: string };
}) {
    const collection = use(
        getCollection(
            name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase(),
        ),
    );
    const itemsData: Item[] = collection.items.map((clc) => {
        return {
            id: clc.id,
            name: clc.name,
            createdAt: formatDate(clc.createdAt),
            updatedAt: formatDate(clc.updatedAt),
        };
    });

    return (
        <>
            <CollectionHeader collection={collection} />
            <ItemsDataTable columns={columns} data={itemsData} />
        </>
    );
}

function formatDate(date: Date): string {
    return date.toLocaleDateString("default", {
        minute: "2-digit",
        hour: "2-digit",
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}
