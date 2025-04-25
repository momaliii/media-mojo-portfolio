
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import StructuredData from './components/StructuredData.tsx';

const RootComponent = () => (
  <React.StrictMode>
    <App />
    <StructuredData />
  </React.StrictMode>
);

createRoot(document.getElementById("root")!).render(<RootComponent />);
