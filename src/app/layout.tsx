import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "~/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Collectify",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${inter.className} bg-white text-black antialiased dark:bg-gray-950 dark:text-white`}>
                    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                        <div className="flex h-screen flex-col justify-between font-sans">
                            <div>
                                <Header />
                                <main className="mb-auto">{children}</main>
                            </div>
                        </div>
                    </section>
                </body>
            </html>
        </ClerkProvider>
    );
}
// user roles (clerk)
// s3 or upload thing
// dummy data for db??
