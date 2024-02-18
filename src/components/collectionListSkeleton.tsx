import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionListSkeleton() {
    return (
        <li className="pt-2 pb-10 list-none">
            <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0">
                    <Skeleton className="w-[125px] h-[22px] justify-self-start" />
                    <div className="space-y-2 xl:col-span-3">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="w-full h-[20px]" />
                                <Skeleton className="flex flex-wrap w-full h-[20px]" />
                            </div>
                            <Skeleton className="max-w-none w-full h-[70px]" />
                        </div>
                        <Skeleton className="w-[92px] h-[22px]" />
                    </div>
                </div>
            </article>
        </li>
    );
}
