import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Collectify Sign-up",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            {children}
        </div>
    );
}
