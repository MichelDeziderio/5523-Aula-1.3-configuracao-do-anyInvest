import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-stepper-topbar',
  templateUrl: './stepper-topbar.component.html',
  styleUrl: './stepper-topbar.component.scss',
})
export class StepperTopbarComponent {
  @Input({ required: true }) steps!: string[];
  @Input({ required: true }) current!: number;
}
