"use client";

import { useEffect, useState } from "react";

export default function Time({ createdAt }: { createdAt: Date }) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return isMounted ? (
        <time dateTime={createdAt.toLocaleDateString()}>
            {createdAt.toLocaleDateString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
        </time>
    ) : (
        <p>Loading Date...</p>
    );
}
