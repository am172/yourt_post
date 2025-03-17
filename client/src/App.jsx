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
  // const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Routes>
      {/* الزوار */}
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPages />} />
        {/* <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} /> */}

        {/* المستخدم المسجل فقط */}
        <Route path='/home' element={ <Home /> } />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:id' element={ <PostPage />} />
      </Route>
    </Routes>
  )
}

export default App
