import { Suspense } from "react";
import { CreateCollectionForm } from "~/components/createCollectionForm";
import CollectionsShowcase from "~/components/collectionsShowcase";
import Header from "~/components/header";
import { Toaster } from "@/components/ui/toaster";
import CollectionsShowcaseSkeleton from "~/components/collectionsShowcaseSkeleton";

export default function Home() {
    return (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between font-sans">
                <div>
                    <Header />
                    <main className="mb-auto">
                        <Suspense fallback={<CollectionsShowcaseSkeleton />}>
                            <CollectionsShowcase
                                label={"Biggest"}
                                description={"Here are the biggest collections"}
                                maxDisplay={5}
                            />
                            <CreateCollectionForm />
                        </Suspense>
                    </main>
                    <Toaster />
                </div>
            </div>
        </section>
    );
}
