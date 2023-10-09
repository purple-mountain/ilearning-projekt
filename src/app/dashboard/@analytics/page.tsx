export default async function Analytics() {
    await timer(3);
    throw new Error();
    return <h1>Analytics</h1>;
}

function timer(delay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay * 1000);
    });
}
