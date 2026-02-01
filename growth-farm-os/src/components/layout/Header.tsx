import { useState, useEffect } from 'react';

export function Header() {
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const now = new Date();
    const month = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    setCurrentMonth(month);
  }, []);

  return (
    <header className="bg-soil sticky top-0 z-50 px-4 py-3.5">
      <div className="flex items-center justify-between">
        <div className="font-heading font-semibold text-canvas text-base tracking-wide">
          GROWTH FARM
        </div>
        <div className="bg-balloon text-soil-light text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {currentMonth}
        </div>
      </div>
    </header>
  );
}
