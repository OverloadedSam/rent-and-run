import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Logout, RequireAuth } from './common';
import { Footer, NavBar } from './components';
import {
  Home,
  Vehicles,
  VehicleDetails,
  SignUp,
  SignIn,
  Cart,
  CouponAndDropAddress,
  PaymentMethod,
  PlaceRental,
  Rentals,
  RentalDetails,
  MyProfile,
} from './screens';

function App() {
  return (
    <Router>
      <NavBar />
      <ToastContainer />
      <main>
        <Routes>
          <Route path='/logout' element={<Logout />} />
          <Route
            path='/profile'
            element={
              <RequireAuth>
                <MyProfile />
              </RequireAuth>
            }
          />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/checkout'>
            <Route
              path='coupon'
              element={
                <RequireAuth>
                  <CouponAndDropAddress />
                </RequireAuth>
              }
            />
            <Route
              path='payment'
              element={
                <RequireAuth>
                  <PaymentMethod />
                </RequireAuth>
              }
            />
            <Route
              path='placerental'
              element={
                <RequireAuth>
                  <PlaceRental />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path='/rentals'
            element={
              <RequireAuth>
                <Rentals />
              </RequireAuth>
            }
          />
          <Route
            path='/rental/:id'
            element={
              <RequireAuth>
                <RentalDetails />
              </RequireAuth>
            }
          />
          <Route path='/vehicle/:id' element={<VehicleDetails />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/cart' element={<Cart />}>
            <Route path=':vehicleId' element={<Cart />} />
          </Route>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
