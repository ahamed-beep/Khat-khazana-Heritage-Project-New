import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Components/Store/Store.jsx';
import { SearchProvider } from './Components/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </StrictMode>
);
