import {
  House,
  Heartbeat,
  SquaresFour,
  CalendarCheck,
  CalendarDots,
} from '@phosphor-icons/react';
import type { NavigationRoute } from '../../types';

interface BottomNavProps {
  activeRoute: NavigationRoute;
  onNavigate: (route: NavigationRoute) => void;
  onOperationsClick: () => void;
}

interface NavItem {
  route: NavigationRoute | 'operations';
  label: string;
  icon: React.ReactNode;
}

export function BottomNav({ activeRoute, onNavigate, onOperationsClick }: BottomNavProps) {
  const navItems: NavItem[] = [
    { route: 'farmstead', label: 'Farmstead', icon: <House weight={activeRoute === 'farmstead' ? 'fill' : 'regular'} /> },
    { route: 'health', label: 'Health', icon: <Heartbeat weight={activeRoute === 'health' ? 'fill' : 'regular'} /> },
    { route: 'operations', label: 'Operations', icon: <SquaresFour weight="regular" /> },
    { route: 'monthly', label: 'Monthly', icon: <CalendarCheck weight={activeRoute === 'monthly' ? 'fill' : 'regular'} /> },
    { route: 'weekly', label: 'Weekly', icon: <CalendarDots weight={activeRoute === 'weekly' ? 'fill' : 'regular'} /> },
  ];

  const handleClick = (item: NavItem) => {
    if (item.route === 'operations') {
      onOperationsClick();
    } else {
      onNavigate(item.route);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-canvas-dark z-50 lg:hidden">
      <div className="flex">
        {navItems.map((item) => {
          const isActive = item.route === activeRoute;
          return (
            <button
              key={item.route}
              onClick={() => handleClick(item)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 text-[9px] font-semibold btn-press transition-colors ${
                isActive ? 'text-soil' : 'text-soil-muted'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
