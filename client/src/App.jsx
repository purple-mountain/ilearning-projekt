import './assets/App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/home'
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { Collection } from './pages/collection';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/collections/:id' element={<Collection />} />
        </Routes>
    );
}

export default App;
