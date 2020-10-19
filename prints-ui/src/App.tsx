import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import { ImageService } from './core/image/ImageService';
import { container, TYPES } from './core/ioc';

import ImagesListView from './imagesList/ImagesListView';
import Upload from './upload/Upload';

import './app.css';

const imageService: ImageService = container.resolve<ImageService>(TYPES.ImageService);

function App() {
  return (
    <>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Prints UI</NavbarBrand>
          <Upload imageService={imageService}></Upload>
        </Navbar>
        <div className="container-fluid py-3">
          <ImagesListView imageService={imageService} />
        </div>
    </>
  );
}

export default App;
