import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import AllAuthors from './components/pages/AllAuthors';
import Blogs from './components/pages/Blogs';
import About from './components/pages/About';
import SingleBlog from './components/pages/SingleBlog';
import UpdateBlog from './components/pages/UpdateBlogs';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/NavBar';


const App = () => {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route path='/about' element={<About />} />
        <Route path='/authors' element={<AllAuthors />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/blog.update.:id' element={<UpdateBlog />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
