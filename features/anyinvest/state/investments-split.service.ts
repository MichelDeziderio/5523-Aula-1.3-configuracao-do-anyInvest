
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

export type AllocationRow = {
  investmentId: string;
  percent: number;
};

export type PersistedAllocation = {
  totalValue: number;
  rows: AllocationRow[];
};

@Injectable({ providedIn: 'root' })
export class InvestmentsSplitService {

  private authService = inject(AuthService);

  private readonly KEY = 'anyinvest:investiments:' + this.authService.currentUser?.id;

  save(data: PersistedAllocation) {
    const raw = localStorage.getItem(this.KEY);
    if (raw) {
      data = {
        totalValue: data.totalValue + (JSON.parse(raw) as PersistedAllocation).totalValue,
        rows: data.rows.concat(JSON.parse(raw).rows)
      };

      localStorage.setItem(this.KEY, JSON.stringify(data));
    } else {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    }
  }

  load(): PersistedAllocation | null {
    const raw = localStorage.getItem(this.KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as PersistedAllocation;
      return {
        totalValue: Number(parsed.totalValue ?? 0),
        rows: Array.isArray(parsed.rows)
          ? parsed.rows.map((r) => ({
            investmentId: String(r.investmentId ?? ''),
            percent: Number(r.percent ?? 0),
          }))
          : [],
      };
    } catch {
      return null;
    }
  }

  clear() {
    localStorage.removeItem(this.KEY);
  }
}
