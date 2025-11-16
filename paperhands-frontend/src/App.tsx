import './App.css'
import React from 'react';
import Navigation from './components/Navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaperHandsLineChart from './components/Chart'
import PaperHandsControlPanel from './components/ControlPanel';

const AppContext = React.createContext(null);
const queryClient = new QueryClient();
function App() {
  return (
    <>
    <AppContext value={null}>
    <QueryClientProvider client={queryClient}>
        <Navigation />
        <PaperHandsLineChart />
        <PaperHandsControlPanel />
    </QueryClientProvider>
    </AppContext> 
    </>
  )
}

export default App
