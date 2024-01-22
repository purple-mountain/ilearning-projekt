import { Suspense } from "react";
import CollectionsShowcase from "~/components/collectionsShowcase";
import { CreateCollectionForm } from "~/components/createCollectionForm";

export default function Topic({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const topicName = slug.slice(0, slug.indexOf("%"));
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <CollectionsShowcase
                    label={topicName[0]?.toUpperCase() + topicName.slice(1)}
                    description={`Here are collections of ${topicName}`}
                    topic={topicName}
                />
                <CreateCollectionForm />
            </Suspense>
        </>
    );
}
