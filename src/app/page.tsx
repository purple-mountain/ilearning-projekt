import { UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Collections } from "~/components/collections";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UserButton afterSignOutUrl="/" />
            <Suspense fallback={<p>Loading Collections...</p>}>
                <Collections />
            </Suspense>
        </main>
    );
}
