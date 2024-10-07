import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header.tsx';
import Nav from './components/Nav/Nav.tsx';
import { useState } from 'react';
import SnackBarUI from './components/SnackBar/SnackBarUI.tsx';
// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Nav />
        <App />
        <SnackBarUI />
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>,
);
