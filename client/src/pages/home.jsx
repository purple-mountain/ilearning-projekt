import { Nav } from '../components/navbar';
import { CreateCollectionForm } from '../components/createCollectionForm';
import { BiggestCollections } from '../components/biggestCollections';

function Home() {

    return (
        <>
            <Nav />
            <main role="main">
                <BiggestCollections />
            </main>
            <div>
                <div>
                    <CreateCollectionForm />
                </div>
            </div>
        </>
    )
}

export { Home }
