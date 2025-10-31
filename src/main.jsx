import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AnimalProvider } from "./context/AnimalContext";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimalProvider>
        <App />
      </AnimalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
