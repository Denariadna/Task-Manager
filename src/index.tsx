import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
