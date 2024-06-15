
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import EditBook from './Pages/Edit-Book';
import Login from './Pages/Login';
import Signup from './Pages/Sign-Up';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit/:id" element={<EditBook />} />
                <Route path="/details/:id" element={<EditBook />} />
                <Route path="/add" element={<EditBook />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
