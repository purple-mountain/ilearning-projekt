import Link from "next/link";

interface TagProps {
    name: string;
}

export default function TopicTag({ name }: TagProps) {
    return (
        <Link
            href={`/topic/${name}}`}
            className="mr-3 text-sm font-medium uppercase text-pink-500 hover:text-pink-600 dark:hover:text-pink-400">
            {name.split(" ").join("-")}
        </Link>
    );
}
