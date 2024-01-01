import { Suspense } from "react";
import { CollectionHeader } from "~/components/collectionHeader";

export default function Home({ params: { id } }: { params: { id: string } }) {
    return (
        <>
            <Suspense fallback={<p>Loading Collection...</p>}>
                <CollectionHeader id={id} />
            </Suspense>
        </>
    );
}
