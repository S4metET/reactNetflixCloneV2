import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import MainLayout from './components/layouts/MainLaout.jsx';

createRoot(document.getElementById('root')).render(
  <MainLayout/>
)