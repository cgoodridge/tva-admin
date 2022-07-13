import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddForm from './pages/AddForm/AddForm';
import Login from './pages/Login/Login';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <>
      <AddForm />
      {/* <Router>
        <Login />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <AddForm />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            <Login />
          } />
        </Routes>
      </Router>

 */}

    </>
  );
}

export default App;
