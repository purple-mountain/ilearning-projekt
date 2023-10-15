import { Suspense } from "react";
import Collections from "~/components/collections";

export default function Home() {
    return (
        <>
            <Suspense fallback={<p>Loading Collections...</p>}>
                <Collections
                    label={"Biggest"}
                    description={"Here are the biggest collections"}
                    maxDisplay={5}
                />
            </Suspense>
        </>
    );
}
