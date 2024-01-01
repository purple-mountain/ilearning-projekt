import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProviders } from "./theme-providers";
import { dark } from "@clerk/themes";

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
        <html lang="en" suppressHydrationWarning>
            <ClerkProvider appearance={{ baseTheme: dark }}>
                <body
                    className={`${inter.className} bg-white text-black antialiased dark:bg-bodyBackground dark:text-slate-200`}
                >
                    <ThemeProviders>{children}</ThemeProviders>
                </body>
            </ClerkProvider>
        </html>
    );
}
// user roles (clerk)
// s3 or upload thing
// dummy data for db??
