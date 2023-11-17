import { Suspense } from "react";
// import AddCollectionForm from "~/components/addCollectionForm";
import Collections from "~/components/collections";

export default function Home() {
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <Collections
                    label={"All"}
                    description={"Here are all of the collections"}
                />
                {/* <AddCollectionForm /> */}
            </Suspense>
        </>
    );
}
