import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, NavBar } from './components';
import { Home, Vehicles, VehicleDetails, SignUp, SignIn } from './screens';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/vehicle/:id' element={<VehicleDetails />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
