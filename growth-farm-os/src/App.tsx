import { useState } from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { OperationsPopup } from './components/layout/OperationsPopup';
import { Farmstead } from './components/dashboard/Farmstead';
import { ExecutiveHealth } from './components/dashboard/ExecutiveHealth';
import { WeeklyPlanner } from './components/weekly/WeeklyPlanner';
import { MonthlyProgress } from './components/monthly/MonthlyProgress';
import { PipelinesView, type PipelineTab } from './components/pipelines';
import type { NavigationRoute } from './types';

function App() {
  const [activeRoute, setActiveRoute] = useState<NavigationRoute>('farmstead');
  const [operationsOpen, setOperationsOpen] = useState(false);
  const [pipelineTab, setPipelineTab] = useState<PipelineTab>('bd');

  const handleNavigate = (route: NavigationRoute) => {
    setActiveRoute(route);
    window.scrollTo(0, 0);
  };

  const handleOperationsNavigate = (area: string) => {
    // Map operations area to pipeline tab
    const areaToTab: Record<string, PipelineTab> = {
      bd: 'bd',
      ventures: 'ventures',
      studio: 'studio',
      finance: 'finance',
      admin: 'admin',
      team: 'bd', // Team goes to setup view instead
    };

    if (area === 'team') {
      // Navigate to setup for team
      setActiveRoute('farmstead');
    } else {
      setPipelineTab(areaToTab[area] || 'bd');
      setActiveRoute('operations');
    }
  };

  const renderContent = () => {
    switch (activeRoute) {
      case 'farmstead':
        return <Farmstead />;
      case 'health':
        return <ExecutiveHealth />;
      case 'operations':
        return <PipelinesView initialTab={pipelineTab} />;
      case 'monthly':
        return <MonthlyProgress />;
      case 'weekly':
        return <WeeklyPlanner />;
      default:
        return <Farmstead />;
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Header />

      <main>
        {renderContent()}
      </main>

      <BottomNav
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        onOperationsClick={() => setOperationsOpen(true)}
      />

      <OperationsPopup
        isOpen={operationsOpen}
        onClose={() => setOperationsOpen(false)}
        onNavigate={handleOperationsNavigate}
      />
    </div>
  );
}

export default App;
