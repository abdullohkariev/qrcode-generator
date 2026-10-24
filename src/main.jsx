import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import QRCodeGenerator from './QRCodeGenerator.jsx';

createRoot(document.getElementById('root')).render(<QRCodeGenerator />);
