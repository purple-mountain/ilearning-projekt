import Link from "next/link";

interface TagProps {
    name: string;
}

export function TopicTag({ name }: TagProps) {
    return (
        <Link
            href={`/topic/${name}}`}
            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            {name.split(" ").join("-")}
        </Link>
    );
}
