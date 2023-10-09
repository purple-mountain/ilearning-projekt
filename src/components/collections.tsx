import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function Collections() {
    const collections = await prisma.collection.findMany();
    await timer(4);
    return (
        <>
            {collections.map((collection) => (
                <p key={collection.id}>{collection.name}</p>
            ))}
        </>
    );
}
function timer(delay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay * 1000);
    });
}
