import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { TopicTag } from "./tag";
import { Time } from "./time";

const prisma = new PrismaClient();

interface CollectionProps {
    label: string;
    description: string;
    maxDisplay: number;
}

export async function Collections({
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
                    {collections.slice(0, maxDisplay).map((collection) => {
                        return (
                            <li key={collection.id} className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">
                                                Published on
                                            </dt>
                                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <Time
                                                    createdAt={
                                                        collection.createdAt
                                                    }
                                                />
                                            </dd>
                                        </dl>
                                        <div className="space-y-5 xl:col-span-3">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                        <Link
                                                            href={`/collection/${collection.id}`}
                                                            className="text-gray-900 dark:text-gray-100">
                                                            {collection.name}
                                                        </Link>
                                                    </h2>
                                                    <div className="flex flex-wrap">
                                                        <TopicTag
                                                            key={
                                                                collection.topic
                                                                    .id
                                                            }
                                                            name={
                                                                collection.topic
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                    {collection.description}
                                                </div>
                                            </div>
                                            <div className="text-base font-medium leading-6">
                                                <Link
                                                    href={`/collection/${collection.id}`}
                                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                                    aria-label={`Read "${collection.name}"`}>
                                                    Read more &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
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
