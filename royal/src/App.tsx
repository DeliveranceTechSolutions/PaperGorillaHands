import './App.css'
import Navigation from './components/Navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PaperHandsLineChart from './components/Chart'

const queryClient = new QueryClient();
function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <PaperHandsLineChart />
    </QueryClientProvider>
    </>
  )
}

export default App
