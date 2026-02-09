// alert.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  private alertService = inject(AlertService);

  alert = this.alertService.alert;

  close() {
    this.alertService.hide();
  }
}
