import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root') || document.createElement('div');
const reactRoot = createRoot(root);
reactRoot.render(<App />);
