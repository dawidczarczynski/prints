import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import { ImageService, ImageServiceImpl } from './core/image/ImageService';
import ImagesListView from './views/ImagesListView';

import './app.css';

const imageService: ImageService = new ImageServiceImpl();

function App() {
  return (
    <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Prints UI</NavbarBrand>
        </Navbar>
        <div className="container-fluid py-3">
          <ImagesListView imageService={imageService} />
        </div>
    </>
  );
}

export default App;
