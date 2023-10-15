import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import CollectionOverview from "./collectionOverview";

const prisma = new PrismaClient();

interface CollectionProps {
    label: string;
    description: string;
    maxDisplay: number;
}

export default async function Collections({
    label,
    description,
    maxDisplay,
}: CollectionProps) {
    const collections = await prisma.collection.findMany({
        include: {
            topic: true,
        },
    });
    return (
        <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {label}
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!collections.length && "No posts found."}
                    {collections.slice(0, maxDisplay).map((collection) => (
                        <CollectionOverview
                            collection={collection}
                            key={collection.id}
                        />
                    ))}
                </ul>
            </div>
            {collections.length > maxDisplay && (
                <div className="flex justify-end text-base font-medium leading-6">
                    <Link
                        href="/blog"
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="All posts">
                        All Posts &rarr;
                    </Link>
                </div>
            )}
            <div className="flex items-center justify-center pt-4">
                <p>Future form</p>
            </div>
        </>
    );
}
// function timer(delay: number): Promise<void> {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, delay * 1000);
//     });
// }
