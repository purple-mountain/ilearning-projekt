export default function Layout({
    children,
    analytics,
}: {
    children: React.ReactNode;
    analytics: React.ReactNode;
}) {
    return (
        <>
            <nav>Nav</nav>
            <main>Main</main>
            {children}
            {analytics}
        </>
    );
}
