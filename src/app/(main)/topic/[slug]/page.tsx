import { Suspense } from "react";
// import AddCollectionForm from "~/components/addCollectionForm";
import Collections from "~/components/collections";

export default function Home({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const topicName = slug.slice(0, slug.indexOf("%"));
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <Collections
                    label={topicName[0]?.toUpperCase() + topicName.slice(1)}
                    description={`Here are collections of ${topicName}`}
                    topic={topicName}
                />
                {/* <AddCollectionForm /> */}
            </Suspense>
        </>
    );
}
