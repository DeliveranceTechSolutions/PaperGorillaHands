import './App.css'
import Navigation from './components/Navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaperHandsLineChart from './components/Chart'
import PaperHandsControlPanel from './components/ControlPanel';

const queryClient = new QueryClient();
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Navigation />
        <PaperHandsLineChart />
        <PaperHandsControlPanel />
    </QueryClientProvider>
    </>
  )
}

export default App
