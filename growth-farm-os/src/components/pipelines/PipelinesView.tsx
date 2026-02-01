import { useState } from 'react';
import { BDPipeline } from './BDPipeline';
import { VenturesPipeline } from './VenturesPipeline';
import { StudioPipeline } from './StudioPipeline';
import { ClientHealth } from './ClientHealth';
import { FinanceView } from './FinanceView';
import { AdminView } from './AdminView';

export type PipelineTab = 'bd' | 'ventures' | 'studio' | 'clients' | 'finance' | 'admin';

interface PipelinesViewProps {
  initialTab?: PipelineTab;
}

const tabs: { id: PipelineTab; label: string }[] = [
  { id: 'bd', label: 'BD' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'studio', label: 'Studio' },
  { id: 'clients', label: 'Clients' },
  { id: 'finance', label: 'Finance' },
  { id: 'admin', label: 'Admin' },
];

export function PipelinesView({ initialTab = 'bd' }: PipelinesViewProps) {
  const [activeTab, setActiveTab] = useState<PipelineTab>(initialTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'bd':
        return <BDPipeline />;
      case 'ventures':
        return <VenturesPipeline />;
      case 'studio':
        return <StudioPipeline />;
      case 'clients':
        return <ClientHealth />;
      case 'finance':
        return <FinanceView />;
      case 'admin':
        return <AdminView />;
      default:
        return <BDPipeline />;
    }
  };

  return (
    <div className="pb-24">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-canvas-dark sticky top-[52px] z-40">
        <div className="flex gap-1.5 px-4 py-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-soil text-canvas'
                  : 'bg-canvas text-soil-muted hover:bg-canvas-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
