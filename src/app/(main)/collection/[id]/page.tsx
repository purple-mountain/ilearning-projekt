import { PrismaClient } from "@prisma/client";
import { CollectionHeader } from "~/components/collectionHeader";
import { ItemsDataTableWrapper } from "~/components/itemsDataTableWrapper";

const prisma = new PrismaClient();
const ITEMS_TABLE_PAGINATION_LIMIT = 10;

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

    return (
        <>
            <CollectionHeader collection={collection} />
            <ItemsDataTableWrapper collection={collection} />
        </>
    );
}
