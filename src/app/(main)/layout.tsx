import Header from "~/components/header";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
            <div className="flex h-screen flex-col justify-between font-sans">
                <Header />
                <main className="mb-auto">{children}</main>
            </div>
        </section>
    );
}
