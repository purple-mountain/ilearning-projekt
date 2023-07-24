import './assets/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home'
import { Login } from './pages/login';
import { SignUp } from './pages/signUp';
import { Collection } from './pages/collection';
import { Item } from './pages/item';
import { UserDashboard } from './pages/userDashboard';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/collections/:id' element={<Collection />} />
            <Route path='/items/:collectionId/:itemId' element={<Item />} />
            <Route path='/userdashboard' element={<UserDashboard />} />
        </Routes>
    );
}

export default App;
