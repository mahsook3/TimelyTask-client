import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/SellerProfile';
import Buyer from './components/BuyerProfile';
import Location from './components/Location';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFail from './components/PaymentFail';
import PageNotFound from './components/PageNotFound';
import Team from './components/Team';
import Contact from './components/Contact';
import Community from './components/Community';
import Testing from './components/Testing';
import CTest from './components/CTest';
import RecipeScanner from './components/recipescanner/RecipeScanner';
import DiscoverWorkers from './components/DiscoverWorkers';
import DetailsTab from './components/DetailsTab';
import PostWork from './components/PostWork';
function App() {
  return (
    <div className='font-[Poppins]'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />

          <Route exact path='/profile/seller' element={<Profile />} />
          <Route exact path='/profile/buyer' element={<Buyer />} />
          <Route exact path='/seller/location' element={<Location />} />
          <Route exact path='/payment/success' element={<PaymentSuccess />} />
          <Route exact path='/payment/fail' element={<PaymentFail />} />
          <Route exact path='/team' element={<Team />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/community' element={<Community />} />
          <Route exact path='/recipescanner' element={<RecipeScanner />} />
          <Route exact path='/test' element={<CTest />} />
          <Route exact path='/testing' element={<Testing />} />
          <Route exact path='/details' element={<DetailsTab />} />
          <Route exact path='/postwork' element={<PostWork />} />

          <Route
  path='/DiscoverWorkers'
  element={<DiscoverWorkers />}
/>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
