import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePages from './Pages/HomePages';
import LoginPages from './Pages/LoginPages';
import OneProduct from './Pages/OneProduct';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePages />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPages />} />
        <Route path='/product/:id' element={<OneProduct />} />

      </Routes>
    </Router>
  );
}

export default App;
