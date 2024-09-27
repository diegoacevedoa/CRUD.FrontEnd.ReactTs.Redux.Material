import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilitiesConfigurator } from './configs/snackbarManager.config.ts';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
    <SnackbarUtilitiesConfigurator />
    <Provider store={store}>
      <App />
    </Provider>
      </SnackbarProvider>
  </StrictMode>,
)