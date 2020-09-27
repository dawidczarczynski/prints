import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import ImagesListView from './views/ImagesListView';

import './app.css';

function App() {
  return (
    <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Prints UI</NavbarBrand>
        </Navbar>
        <div className="container-fluid py-3">
          <ImagesListView />
        </div>
    </>
  );
}

export default App;
