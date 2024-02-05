"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function UserButtonWrapper() {
    const { theme } = useTheme();
    const baseTheme = theme === "dark" ? dark : undefined;

    return (
        <UserButton
            afterSignOutUrl="/"
            appearance={{ baseTheme: baseTheme, userProfile: { baseTheme: baseTheme } }}
        />
    );
}
