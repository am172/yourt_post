import './App.css'
import Header from './Header'
import Layout from './Layout'
import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import IndexPages from './pages/IndexPages'
import LoginPage from './pages/LoginPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import Post from './Post'
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Routes>
      {/* الزوار */}
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPages />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* المستخدم المسجل فقط */}
        <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path='/create' element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path='/post/:id' element={isAuthenticated ? <PostPage /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}

export default App
