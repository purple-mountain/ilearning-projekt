import { Skeleton } from "@/components/ui/skeleton";
import CollectionListSkeleton from "./collectionListSkeleton";

export default function CollectionsShowcaseSkeleton() {
    return (
        <div>
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <Skeleton className="w-full h-[60px]"></Skeleton>
                <Skeleton className="w-full h-[28px]"></Skeleton>
            </div>
            <CollectionListSkeleton />
            <CollectionListSkeleton />
            <CollectionListSkeleton />
        </div>
    );
}
