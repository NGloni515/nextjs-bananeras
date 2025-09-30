'use client';
import Dashboard from '../../components/dashboard/Dashboard';
import IsOnboarding from '../../components/ui/IsOnboarding';

const DashboardPage = (): JSX.Element => {
  return <Dashboard />;
};

export default IsOnboarding(DashboardPage);
