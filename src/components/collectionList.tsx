import Link from "next/link";
import Time from "./time";
import TopicTag from "./tag";
import { type CollectionWithTopic } from "~/lib/types";
import { capitalize } from "~/utils/capitalize";

type CollectionListProps = {
    collections: CollectionWithTopic[];
    maxDisplay?: number;
};

export default function CollectionList({ collections, maxDisplay }: CollectionListProps) {
    return collections.slice(0, maxDisplay).map((collection) => (
        <li key={collection.id} className="py-12">
            <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <Time createdAt={collection.createdAt} />
                        </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                    <Link
                                        href={`/collection/${collection.id}`}
                                        className="dark:text-gray-100"
                                    >
                                        {capitalize(collection.name)}
                                    </Link>
                                </h2>
                                <div className="flex flex-wrap">
                                    <TopicTag
                                        key={collection.topic.id}
                                        name={collection.topic.name}
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
                                className="text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
                                aria-label={`Read "${collection.name}"`}
                            >
                                See more &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    ));
}
