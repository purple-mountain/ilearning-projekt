"use client";

import DateFormatter from "@date-js/date-formatter";

export function Time({ createdAt }: { createdAt: Date }) {
    return (
        <time dateTime={createdAt.toLocaleDateString()}>
            {DateFormatter.format(
                "%F %d, %Y",
                new Date(createdAt.toLocaleDateString()),
            )}
        </time>
    );
}
