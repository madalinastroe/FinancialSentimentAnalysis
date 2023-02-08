import React from 'react';

import './index.css';
import App from './App';
import './locales';
import 'antd/dist/antd.min.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <App />
);