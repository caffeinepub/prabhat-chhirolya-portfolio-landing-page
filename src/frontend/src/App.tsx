import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';

type Mode = 'initial' | 'personal' | 'professional';

function App() {
  const [mode, setMode] = useState<Mode>('initial');

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <div className="h-screen w-screen overflow-hidden bg-background">
        <LandingPage mode={mode} onModeChange={setMode} />
      </div>
    </ThemeProvider>
  );
}

export default App;
