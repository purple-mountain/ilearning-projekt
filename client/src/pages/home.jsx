import { Nav } from '../components/navbar';
import { CreateCollectionForm } from '../components/home/createCollectionForm';
import { BiggestCollections } from '../components/home/biggestCollections';
import { useQuery } from '@tanstack/react-query';
import users from '../services/users';

function Home() {
    const { data: currentUser, isSuccess } = useQuery({
        queryKey: ["currentUser"],
        queryFn: users.getCurrentUser
    })

    return (
        <>
            <Nav />
            <main role="main">
                <BiggestCollections />
            </main>
            {isSuccess && currentUser.name !== 'Guest' ? <div>
                <CreateCollectionForm />
            </div> : ''}
        </>
    )
}

export { Home }
