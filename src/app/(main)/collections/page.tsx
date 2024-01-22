import { Suspense } from "react";
import CollectionsShowcase from "~/components/collectionsShowcase";
import { CreateCollectionForm } from "~/components/createCollectionForm";

export default function Collections() {
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <CollectionsShowcase
                    label={"All"}
                    description={"Here are all of the collections"}
                />
                <CreateCollectionForm />
            </Suspense>
        </>
    );
}
