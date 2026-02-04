import { useState, useEffect } from 'react';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import LandingPage from './pages/LandingPage';

type Mode = 'initial' | 'personal' | 'professional';

function App() {
  const [mode, setMode] = useState<Mode>('initial');

  // Apply dark theme class directly to document root
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <AppErrorBoundary>
      <div className="h-screen w-screen overflow-hidden bg-background">
        <LandingPage mode={mode} onModeChange={setMode} />
      </div>
    </AppErrorBoundary>
  );
}

export default App;
