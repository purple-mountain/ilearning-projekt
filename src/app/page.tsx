import { Suspense } from "react";
// import AddCollectionForm from "~/components/addCollectionForm";
import Collections from "~/components/collections";
import Header from "~/components/header";

export default function Home() {
    return (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between font-sans">
                <div>
                    <Header />
                    <main className="mb-auto">
                        <Suspense fallback={<p>Loading Collections...</p>}>
                            <Collections
                                label={"Biggest"}
                                description={"Here are the biggest collections"}
                                maxDisplay={5}
                            />
                            {/* <AddCollectionForm /> */}
                        </Suspense>
                    </main>
                </div>
            </div>
        </section>
    );
}
