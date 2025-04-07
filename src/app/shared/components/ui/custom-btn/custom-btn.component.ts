import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  imports: [NgClass],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss',
})
export class CustomBtnComponent {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
}
