import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from './hooks/useNavigate';
import { currentPage } from './models/users/selectors';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { AllUsers as AllUsersPage } from './pages/AllUsers';
import { Authentication as AuthPage } from './pages/Authentication';
import { ChangePassword as ChangePasswordPage } from './pages/ChangePassword';
import { Home as HomePage } from './pages/Home';

function App() {
  const _currentPage = useSelector(currentPage);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(_currentPage);
  }, [_currentPage, navigate]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='all-users' element={<AllUsersPage />} />
        <Route path='auth' element={<AuthPage />} />
        <Route path='change-password' element={<ChangePasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
