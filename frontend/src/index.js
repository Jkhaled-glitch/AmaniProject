import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(


    <ThemeContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </ThemeContextProvider>,
    document.getElementById('root')
);