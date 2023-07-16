import { useQuery } from '@tanstack/react-query';
import './assets/App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './pages/home'
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';

function App() {
    const location = useLocation()
    console.log(location)

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='sign-up' element={<SignUp />}></Route>
            </Routes>
        </>
    );
}

export default App;
