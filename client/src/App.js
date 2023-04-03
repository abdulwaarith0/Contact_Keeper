import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import Navbar from './components/layout/Navbar';
import ContactState from './context/contact/ContactState';
import './App.css';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route exact path="/about" Component={About} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
