import { useState } from 'react';
import { Card, CardTitle, Button } from '../shared';
import { financeSnapshot } from '../../data/sampleData';

export function FinanceView() {
  const [formData, setFormData] = useState({
    ytdRevenue: financeSnapshot.ytdRevenue,
    cashReserves: financeSnapshot.cashReserves,
    taxDebtOutstanding: financeSnapshot.taxDebtOutstanding,
    taxMonthlyPaid: financeSnapshot.taxMonthlyPaid,
  });

  const formatInputValue = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('ZAR', 'R');
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    // Remove non-numeric characters and parse
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    setFormData((prev) => ({ ...prev, [field]: numericValue }));
  };

  return (
    <div className="p-4 pb-24 space-y-3">
      <Card>
        <CardTitle>Revenue</CardTitle>
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
              YTD Actual
            </label>
            <input
              type="text"
              className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon"
              value={formatInputValue(formData.ytdRevenue)}
              onChange={(e) => handleChange('ytdRevenue', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
              YTD Target
            </label>
            <input
              type="text"
              className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas/50 cursor-not-allowed"
              value={formatInputValue(financeSnapshot.annualRevenueTarget / 12)}
              readOnly
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Cash</CardTitle>
        <div>
          <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
            Current Reserves
          </label>
          <input
            type="text"
            className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon"
            value={formatInputValue(formData.cashReserves)}
            onChange={(e) => handleChange('cashReserves', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <CardTitle>Tax Debt</CardTitle>
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
              Outstanding
            </label>
            <input
              type="text"
              className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon"
              value={formatInputValue(formData.taxDebtOutstanding)}
              onChange={(e) => handleChange('taxDebtOutstanding', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
                Monthly Target
              </label>
              <input
                type="text"
                className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas/50 cursor-not-allowed"
                value={formatInputValue(financeSnapshot.taxMonthlyTarget)}
                readOnly
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-soil-muted uppercase mb-1.5">
                Jan Paid
              </label>
              <input
                type="text"
                className="w-full border border-soil/20 rounded-lg px-3 py-2.5 text-sm text-soil bg-canvas focus:outline-none focus:border-balloon"
                value={formatInputValue(formData.taxMonthlyPaid)}
                onChange={(e) => handleChange('taxMonthlyPaid', e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>

      <Button fullWidth onClick={() => alert('Saved!')}>
        Save
      </Button>
    </div>
  );
}
