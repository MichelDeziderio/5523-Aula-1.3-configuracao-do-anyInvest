import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error';

export interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  type: AlertType;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly _alert = signal<AlertState>({
    visible: false,
    title: '',
    message: '',
    type: 'success',
  });

  readonly alert = this._alert.asReadonly();

  show(title: string, message: string, type: AlertType = 'success') {
    this._alert.set({
      visible: true,
      title,
      message,
      type,
    });

    setTimeout(() => {
      this.hide();
    }, 5000);
  }

  hide() {
    this._alert.update(alert => ({
      ...alert,
      visible: false,
    }));
  }
}