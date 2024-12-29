import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection.jsx';
import About from './pages/About.jsx';
import Context from './pages/Context.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Loging from './pages/Loging.jsx';
import Place from './pages/Place.jsx';
import Navbar from './component/Navbar.jsx';
import Order from './pages/Order.jsx';
import Footer from './component/Footer.jsx';
import SearchBar from './component/SearchBar.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">


      <ToastContainer />
      <Navbar />
      <SearchBar/>
  

      {/* Only use Routes and Route here */}
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/about"  element={<About/>} />
        <Route path="/context" element={<Context/>} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/loging" element={<Loging/>} />
        <Route path="/place-order" element={<Place/>} />
        <Route path="/order" element={<Order/>} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
