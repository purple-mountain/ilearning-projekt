import { PrismaClient } from "@prisma/client";
import Time from "./time";
import { clerkClient } from "@clerk/nextjs";
import NextImage from "next/image";

const prisma = new PrismaClient();

export async function CollectionHeader({ id }: { id: string }) {
    const collection = await prisma.collection.findFirstOrThrow({
        where: {
            id: id,
        },
        include: {
            items: true,
        },
    });
    const author = await clerkClient.users.getUser(collection.authorId);
    return (
        <div>
            <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {collection.name}
            </h1>
            <dd className="mt-5">
                <div className="flex flex-wrap justify-between">
                    <div className="flex items-center space-x-3">
                        <NextImage
                            src={author.imageUrl}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                        />
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                            <dt className="sr-only">Name</dt>
                            <dd className="text-gray-900 dark:text-gray-100">
                                {`${author.firstName} ${author.lastName}`}
                            </dd>
                            <dt className="sr-only">Twitter</dt>
                            <dd>
                                <p className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                                    @{author.username}
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <p className="flex items-center text-gray-500 dark:text-gray-400 leading-7">
                        <Time createdAt={collection.createdAt} />
                    </p>
                </div>
            </dd>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                {collection.description}
            </p>
        </div>
    );
}
