export default async function Dashboard() {
    await timer(3);
    return <h1>Dashboard</h1>;
}

function timer(delay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay * 1000);
    });
}
