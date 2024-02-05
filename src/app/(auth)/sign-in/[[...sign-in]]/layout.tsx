import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collectify Sign-in",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen flex justify-center items-center">{children}</div>;
}
