import { Suspense } from "react";
import { Collections } from "~/components/collections";

export default function Home() {
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <Collections />
            </Suspense>
        </>
    );
}
