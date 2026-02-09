import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-stepper-sidebar',
  imports: [],
  templateUrl: './stepper-sidebar.component.html',
  styleUrl: './stepper-sidebar.component.scss',
})
export class StepperSidebarComponent {
  @Input({ required: true }) steps!: string[];
  @Input({ required: true }) current!: number;
}
