import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type FakeOption = { id: string; label: string; disabled?: boolean };

@Component({
  selector: 'app-fake-select-rf',
  imports: [CommonModule],
  templateUrl: './fake-select-rf.html',
  styleUrl: './fake-select-rf.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FakeSelectRf),
      multi: true,
    },
  ],
})
export class FakeSelectRf implements ControlValueAccessor {
  @Input() placeholder = 'Selecione...';
  @Input() options: FakeOption[] = [];

  open = false;
  disabled = false;

  value: string | null = null;

  private onChange: (val: string | null) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private el: ElementRef<HTMLElement>) { }

  get selectedLabel(): string | null {
    if (!this.value) return null;
    return this.options.find(o => o.id === this.value)?.label ?? null;
  }

  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    this.onTouched();
  }

  select(opt: FakeOption) {
    if (opt.disabled) return;

    this.value = opt.id;
    this.onChange(opt.id);
    this.onTouched();
    this.open = false;
  }

  // ✅ ControlValueAccessor
  writeValue(val: string | null): void {
    this.value = val;
  }

  registerOnChange(fn: (val: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) this.open = false;
  }

  // Fecha ao clicar fora
  @HostListener('document:mousedown', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.open) return;
    const target = e.target as Node | null;
    if (target && !this.el.nativeElement.contains(target)) {
      this.open = false;
      this.onTouched();
    }
  }

  // Fecha no ESC (UX)
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) {
      this.open = false;
      this.onTouched();
    }
  }
}
