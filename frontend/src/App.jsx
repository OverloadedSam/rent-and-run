import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer, NavBar } from './components';
import { Home, Vehicles } from './screens';

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
