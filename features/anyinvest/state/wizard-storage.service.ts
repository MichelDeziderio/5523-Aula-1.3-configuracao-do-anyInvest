import { Injectable } from '@angular/core';

export type WizardSaved = { step: number; formValue: any; };

@Injectable({ providedIn: 'root' })
export class WizardStorageService {
  private key(userId: string) { return `anyinvest:wizard:${userId}`; }

  load(userId: string): WizardSaved | null {
    const raw = sessionStorage.getItem(this.key(userId));
    if (!raw) return null;
    try { return JSON.parse(raw) as WizardSaved; } catch { return null; }
  }

  saveDraft(userId: string, step: number, formValue: any) {
    sessionStorage.setItem(
      this.key(userId),
      JSON.stringify({
        step,
        formValue,
        finished: step === 6 ? true : false
      }));
  }

  saveStep(userId: string, step: number) {
    const current = this.load(userId);
    sessionStorage.setItem(
      this.key(userId),
      JSON.stringify({
        step,
        formValue: current?.formValue ?? {},
        finished: step === 6 ? true : false
      }));
  }

  clear(userId: string) { sessionStorage.removeItem(this.key(userId)); }
}
