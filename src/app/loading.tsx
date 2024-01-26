import { Spinner } from "~/components/spinner";

export default function Loading() {
    return (
        <section className="flex h-screen justify-center items-center">
            <div>
                <Spinner />
            </div>
        </section>
    );
}
