'use client';
import { useEffect, useState } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import IsOnboarding from '../../components/ui/IsOnboarding';

interface WindowSizeProps {
  width: number | null;
  height: number | null;
}

const DashboardPage = (): JSX.Element => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: null,
    height: null,
  });

  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Dashboard windowSize={windowSize} />;
};

export default IsOnboarding(DashboardPage);
